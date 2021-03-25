<template>
    <div v-if="player" id="player">
        <header>
            <div class="mb-5 text-xs text-gray-500">
                <router-link :to="{ name: 'players.index' }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">Players</router-link>
                / <span>{{ player.name }}</span>
            </div>
            <div class="flex justify-between items-center">
                <PlayerForm v-if="isEditing" :player="player" @done="isEditing = false" class="mb-5" />
                <h1 v-else class="group mb-5 text-3xl font-bold leading-tight text-gray-900">
                    {{ player.name }}
                    <span v-if="player.isGuest" class="text-gray-400">(Guest)</span>
                    <div @click="isEditing = true" class="inline-block text-white cursor-pointer group-hover:text-indigo-800">
                        <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </div>
                </h1>
                <aside class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <select v-model="season" class="block form-input transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        <option value="" selected>All Seasons</option>
                        <option v-for="season in seasons" :key="season.id" :value="season.id">{{ season.name }}</option>
                    </select>
                </aside>
            </div>
        </header>

        <PlayerDetails v-if="player" :player="player" :results="filteredResults" />

        <div class="flex flex-col">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        </thead>
                        <tbody>
                            <tr v-for="(result, index) in filteredResults" :key="result.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <router-link :to="{ name: 'competitions.show', params: { id: result.competitionId } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">
                                        {{ competition(result.competitionId).date | formatDate }}
                                    </router-link>
                                </td>
                                <td class="px-6 py-4  whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.total }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { byDate } from '@/getter-helpers'
import PlayerForm from '@/components/PlayerForm'
import PlayerDetails from '@/components/PlayerDetails'

export default {
    name: 'SinglePlayer',

    components: {
        PlayerForm,
        PlayerDetails
    },

    data () {
        return {
            isEditing: false,
            season: ''
        }
    },

    computed: {
        ...mapGetters(['findPlayer', 'findCompetition', 'playerResults', 'seasons']),

        player () {
            return this.findPlayer(this.$route.params.id)
        },

        results () {
            return this.playerResults(this.player.id).sort(byDate)
        },

        filteredResults () {
            return this.season ? [...this.results].filter(result => result.competition.seasonId === this.season) : this.results
        }
    },

    methods: {
        competition (id) {
            return this.findCompetition(id)
        }
    }
}
</script>
