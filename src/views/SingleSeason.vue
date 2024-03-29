<template>
    <div v-if="season" id="season">
        <header>
            <div class="mb-4 -mt-4 text-xs text-gray-500">
                <router-link :to="{ name: 'seasons.index' }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </router-link>
            </div>
        </header>

        <header class="md:flex justify-between mb-5">
            <h1 class="mb-5 md:mb-0 text-3xl font-bold leading-tight text-gray-900">Season {{ season.name }}</h1>
            <router-link v-if="user.loggedIn" :to="{ name: 'competitions.create', params: { id: season.id } }" class="hidden flex-none md:flex items-center justify-center px-3 py-2 ml-2 border border-transparent text-sm text-center leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                New Competition
            </router-link>
        </header>

        <footer v-if="user.loggedIn" class="md:hidden mb-10">
            <router-link :to="{ name: 'competitions.create', params: { id: season.id } }" class="flex-none flex items-center justify-center px-3 py-4 ml-2 border border-transparent text-sm text-center leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                New Competition
            </router-link>
        </footer>

        <header class="md:flex items-center justify-between mb-4 md:mb-0">
            <nav class="flex space-x-4 mb-4" aria-label="Tabs">
                <a @click.prevent="changeView" href="#" class="px-3 py-2 font-medium text-sm rounded-md" :class="viewLeadboard ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'">
                    Leaderboard
                </a>
                <a @click.prevent="changeView" href="#" class="px-3 py-2 font-medium text-sm rounded-md" :class="viewLeadboard ? 'text-gray-500 hover:text-gray-700' : 'bg-gray-100 text-gray-700'">
                    Competitions ({{ competitions.length }})
                </a>
            </nav>

            <aside v-if="!viewLeadboard" class="hidden md:flex items-center text-sm md:ml-3">
                <p class="flex items-center ml-4"><span class="w-4 h-4 mr-2 bg-blue-300 rounded"></span> +2 Points</p>
                <p class="flex items-center ml-4"><span class="w-4 h-4 mr-2 bg-green-300 rounded"></span> +4 Points</p>
                <p class="flex items-center ml-4"><span class="w-4 h-4 mr-2 bg-orange-300 rounded"></span> Table Championship</p>
            </aside>
        </header>

        <Leaderboard v-if="viewLeadboard" :season-id="season.id" />

        <div v-else class="mb-10 flex flex-col">
            <div class="py-2 overflow-x-auto -mx-2 md:mx-0">
                <div v-if="competitions.length > 0" class="align-middle inline-block min-w-full overflow-hidden md:shadow md:rounded-lg md:border md:border-gray-100">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Competition Date</th>
                            <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Players</th>
                            <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                        </thead>
                        <tbody>
                            <router-link :to="{ name: 'competitions.show', params: { id: competition.id } }" v-for="(competition, index) in competitions" :key="competition.id" :class="backgroundColor(competition, index)" class="table-row">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium" :class="competitionColors(competition)">
                                    {{ competition.date | formatDate }}
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ competitionResultCount(competition.id) }}</td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <svg v-if="user.loggedIn && hasNoResults(competition.id)" @click.prevent="removeCompetition(competition.id)" viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer ml-auto">
                                        <path class="heroicon-ui" d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"/>
                                    </svg>
                                </td>
                            </router-link>
                        </tbody>
                    </table>
                </div>
                <div v-else class="my-10 text-center">
                    <h4 class="text-xl font-semibold">No Competitions yet!</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { REMOVE_COMPETITION } from '@/action-types'
import Leaderboard from '../components/Leaderboard'

export default {
    name: 'SingleSeason',

    components: {
        Leaderboard
    },

    data () {
        return {
            viewLeadboard: true
        }
    },

    computed: {
        ...mapGetters(['user', 'findSeason', 'seasonCompetitions', 'competitionResultCount']),

        season () {
            return this.findSeason(this.$route.params.id)
        },

        competitions () {
            return this.seasonCompetitions(this.season.id)
        }
    },

    methods: {
        changeView () {
            this.viewLeadboard = !this.viewLeadboard
        },

        hasNoResults (id) {
            return this.competitionResultCount(id) === 0
        },

        removeCompetition (id) {
            this.$store.dispatch(REMOVE_COMPETITION, id)
        },

        backgroundColor (competition, index) {
            return competition.isChampionshipDay ? 'bg-orange-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
        },

        competitionColors (competition) {
            if (competition.isChampionshipDay) return 'text-orange-500 hover:text-orange-700'
            if (competition.isSecondBonusMonth) return 'text-green-400 hover:text-green-600'
            if (competition.isFirstBonusMonth) return 'text-blue-400 hover:text-blue-500'

            return 'text-indigo-600 hover:text-indigo-900'
        }
    }
}
</script>
