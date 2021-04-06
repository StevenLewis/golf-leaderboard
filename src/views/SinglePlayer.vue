<template>
    <div v-if="player" id="player">
        <header>
            <div class="mb-4 -mt-4 text-xs text-gray-500">
                <router-link :to="{ name: 'players.index' }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </router-link>
            </div>

            <PlayerForm v-if="isEditing" :player="player" @done="isEditing = false" class="mb-5" />
            <h1 class="group mb-2.5 text-3xl font-bold leading-tight text-gray-900">
                {{ player.name }}
                <span v-if="player.isGuest" class="text-gray-400">(Guest)</span>
                <div v-if="user.loggedIn" @click="isEditing = true" class="inline-block text-white cursor-pointer group-hover:text-indigo-800">
                    <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </div>
            </h1>

            <aside class="flex items-center justify-between mb-4">
                <nav class="flex items-center" aria-label="Tabs">
                    <a @click.prevent="changeView" href="#" class="px-3 py-1.5 font-medium text-sm rounded-md" :class="viewStats ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'">
                        Stats
                    </a>
                    <a @click.prevent="changeView" href="#" class="px-3 py-1.5 font-medium text-sm rounded-md" :class="viewStats ? 'text-gray-500 hover:text-gray-700' : 'bg-gray-100 text-gray-700'">
                        Results
                    </a>
                </nav>

                <select v-model="season" class="block form-input text-sm py-1.5 transition duration-150 ease-in-out text-sm sm:leading-5">
                    <option value="" selected>All Seasons</option>
                    <option v-for="season in seasons" :key="season.id" :value="season.id">{{ season.name }}</option>
                </select>
            </aside>
        </header>

        <PlayerDetails v-if="player && viewStats" :player="player" :results="filteredResults" />

        <div v-else class="flex flex-col">
            <div class="-mx-2 py-2 overflow-x-auto md:mx-0">
                <div class="align-middle inline-block min-w-full overflow-hidden md:rounded-lg md:shadow md:border md:border-gray-100">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        </thead>
                        <tbody>
                            <router-link :to="{ name: 'competitions.show', params: { id: result.competitionId } }" v-for="(result, index) in filteredResults" :key="result.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'" class="table-row">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <span class="text-indigo-600">{{ competition(result.competitionId).date | formatDate }}</span>
                                </td>
                                <td class="px-6 py-4  whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.total }}</td>
                            </router-link>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
            viewStats: true,
            season: ''
        }
    },

    computed: {
        ...mapGetters(['user', 'findPlayer', 'findCompetition', 'playerResults', 'seasons']),

        player () {
            return this.findPlayer(this.$route.params.id)
        },

        results () {
            return this.playerResults(this.player.id).sort((a, b) => {
                const aDate = this.competition(a.competitionId).date
                const bDate = this.competition(b.competitionId).date

                return aDate === bDate ? 0 : (aDate < bDate) ? 1 : -1
            })
        },

        filteredResults () {
            return this.season ? [...this.results].filter(result => this.competition(result.competitionId).seasonId === this.season) : this.results
        }
    },

    methods: {
        competition (id) {
            return this.findCompetition(id)
        },

        changeView () {
            this.viewStats = !this.viewStats
        }
    }
}
</script>
