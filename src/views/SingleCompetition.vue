<template>
    <div id="competition">
        <header>
            <div class="mb-5 text-xs text-gray-500">
                <router-link :to="{ name: 'competitions.index' }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">Competitions</router-link>
                / <span>{{ competition.date | formatDate }}</span>
            </div>
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">{{ competition.date | formatDate }}</h1>
        </header>

        <div class="flex flex-col mb-10">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Player</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        </thead>
                        <tbody>
                            <tr v-for="(result, index) in results" :key="result.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ index + 1 }}</td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <router-link :to="{ name: 'players.show', params: { id: result.playerId } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ players[result.playerId].name }}</router-link>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.score }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="max-w-xs">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Add new result
            </h3>
            <p class="mb-5 mt-1 text-sm leading-5 text-gray-500">
                Choose the player from the dropdown, and input their score.
            </p>
            <form @submit.prevent="submit">
                <div class="max-w-xs rounded-md shadow-sm">
                    <select v-model="player" class="block form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        <option v-for="player in players" :key="player.id" :value="player.id">{{ player.name }}</option>
                    </select>
                </div>
                <input type="text" v-model.number="score" placeholder="Score..." class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
            </form>
        </div>
    </div>
</template>

<script>
import { RECORD_RESULT } from '../action-types'
import { mapState } from 'vuex'

export default {
    name: 'SingleCompetition',

    data () {
        return {
            score: 0,
            player: '',
            qualifying: true
        }
    },

    computed: {
        ...mapState(['competitions', 'players']),

        competition () {
            return this.competitions[this.$route.params.id] || {}
        },

        results () {
            return this.$store.getters.competitionResults(this.competition.date) || []
        }
    },

    methods: {
        submit () {
            if (this.score.length === 0 || this.player.length === 0) {
                return
            }

            this.$store.dispatch(RECORD_RESULT, {
                playerId: this.player,
                qualifying: this.qualifying,
                score: this.score,
                date: this.competition.date
            })

            this.score = 0
            this.date = ''
        }
    }
}
</script>
