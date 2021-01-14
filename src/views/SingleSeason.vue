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
            <router-link :to="{ name: 'competitions.create', params: { id: season.id } }" class="hidden flex-none md:flex items-center justify-center px-3 py-2 ml-2 border border-transparent text-sm text-center leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
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
                        </thead>
                        <tbody>
                            <tr v-for="(competition, index) in season.competitions" :key="competition.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <router-link :to="{ name: 'competitions.show', params: { id: competition.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ competition.date | formatDate }}</router-link>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ playerCount(competition.id) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Leaderboard from '../components/Leaderboard'

export default {
    name: 'SingleSeason',

    components: {
        Leaderboard
    },

    computed: {
        ...mapState(['user']),
        ...mapGetters(['findSeason', 'competitionResults']),

        season () {
            return this.findSeason(this.$route.params.id)
        }
    },

    methods: {
        playerCount (id) {
            return this.competitionResults(id).length || 0
        }
    }
}
</script>
