<template>
    <div v-if="season" id="season">
        <header>
            <div class="mb-6 md:mb-10 text-xs text-gray-500">
                <router-link :to="{ name: 'seasons.index' }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">All Seasons</router-link>
                / <span>{{ season.name }}</span>
            </div>
        </header>

        <header class="md:flex justify-between mb-5">
            <h1 class="mb-5 md:mb-0 text-3xl font-bold leading-tight text-gray-900">Season {{ season.name }}</h1>
            <router-link v-if="user.loggedIn" :to="{ name: 'competitions.create', params: { id: season.id } }" class="hidden flex-none md:flex items-center justify-center px-3 py-2 ml-2 border border-transparent text-sm text-center leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                New Competition
            </router-link>
        </header>

        <Leaderboard :season-id="season.id" />

        <footer v-if="user.loggedIn" class="md:hidden mb-10">
            <router-link :to="{ name: 'competitions.create', params: { id: season.id } }" class="flex-none flex items-center justify-center px-3 py-4 ml-2 border border-transparent text-sm text-center leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                New Competition
            </router-link>
        </footer>

        <div class="mb-10 flex flex-col">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Competition Date</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Players</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                        </thead>
                        <tbody>
                            <tr v-for="(competition, index) in competitions" :key="competition.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <router-link :to="{ name: 'competitions.show', params: { id: competition.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ competition.date | formatDate }}</router-link>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ competitionResultCount(competition.id) }}</td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <svg v-if="user.loggedIn && hasNoResults(competition.id)" @click.prevent="removeCompetition(competition.id)" viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer ml-auto">
                                        <path class="heroicon-ui" d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"/>
                                    </svg>
                                </td>
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
import { REMOVE_COMPETITION } from '@/action-types'
import Leaderboard from '../components/Leaderboard'

export default {
    name: 'SingleSeason',

    components: {
        Leaderboard
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
        hasNoResults (id) {
            return this.competitionResultCount(id) === 0
        },

        removeCompetition (id) {
            this.$store.dispatch(REMOVE_COMPETITION, id)
        }
    }
}
</script>
