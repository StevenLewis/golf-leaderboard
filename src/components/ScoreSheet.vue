<template>
    <div class="flex flex-col mb-10">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200">
                <table class="min-w-full">
                    <thead>
                        <th class="px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th class="px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Player</th>
                        <th class="px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                        <th class="px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th class="hidden md:table-cell px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Cuts</th>
                        <th class="px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nett</th>
                        <th class="px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Countback</th>
                        <th class="px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(result, index) in results" :key="result.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                            <td class="px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ index + 1 }}</td>
                            <td class="px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                {{ player(result.playerId).name }}
                                <template v-if="player(result.playerId).isGuest"> (G)</template>
                            </td>
                            <td class="px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                <button @click="toggleEntry(result)" type="button" aria-pressed="false" aria-labelledby="toggleLabel" :class="result.entered ? 'bg-indigo-600' : 'bg-gray-200'" class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span class="sr-only">Use setting</span>
                                    <span aria-hidden="true" :class="result.entered ? 'translate-x-5' : 'translate-x-0'" class="inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                                </button>
                            </td>
                            <td class="px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                <input @input="$emit('scores', scores)" v-model.number="scores[index]" type="text" name="score" :id="`score-${index}`" class="block p-2 w-20 border border-gray-300 rounded-md focus:ring-indigo-400 focus:border-indigo-400 sm:max-w-xs sm:text-sm" autocomplete="off">
                            </td>
                            <td class="hidden md:table-cell px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.cuts }}</td>
                            <td class="px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium" :class="isTopFour(index) ? 'text-indigo-500' : 'text-gray-500'">{{ nett(index) }}</td>
                            <td class="px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                <input @input="$emit('countbacks', countbacks)" v-model.number="countbacks[index]" type="text" name="score" :id="`countback-${index}`" class="block p-2 w-20 border border-gray-300 rounded-md focus:ring-indigo-400 focus:border-indigo-400 sm:max-w-xs sm:text-sm" autocomplete="off">
                            </td>
                            <td class="px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                <svg v-if="user.loggedIn" @click.prevent="removeResult(result.id)" viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer">
                                    <path class="heroicon-ui" d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"/>
                                </svg>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { REMOVE_RESULT, TOGGLE_ENTRY } from '@/action-types'
import { mapGetters } from 'vuex'
import { entryFee } from '@/config/money'

export default {
    name: 'ScoreSheet',

    props: {
        results: {
            type: Array,
            required: true
        },

        scores: {
            type: Array,
            required: true
        },

        countbacks: {
            type: Array,
            required: true
        }
    },

    computed: {
        ...mapGetters(['user', 'findPlayer']),

        nettScores () {
            return [...this.scores].map((score, index) => score - this.results[index].cuts).sort((a, b) => b - a)
        }
    },

    methods: {
        toggleEntry (result) {
            this.$store.dispatch(TOGGLE_ENTRY, {
                resultId: result.id,
                entryFee: result.entered ? 0 : entryFee
            })
        },

        removeResult (id) {
            this.$store.dispatch(REMOVE_RESULT, id)
        },

        nett (index) {
            if (this.scores[index] === undefined) return 0

            return this.scores[index] - this.results[index].cuts
        },

        player (id) {
            return this.findPlayer(id)
        },

        isTopFour (index) {
            return this.nett(index) >= this.nettScores[3]
        }
    }
}
</script>
