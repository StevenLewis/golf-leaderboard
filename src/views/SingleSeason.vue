<template>
    <div id="season">
        <header>
            <div class="mb-10 text-xs text-gray-500">
                <router-link :to="{ name: 'seasons.index' }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">Seasons</router-link>
                / <span>{{ season.name }}</span>
            </div>
        </header>

        <header>
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">{{ season.name }}</h1>
        </header>
        <div class="mb-10 flex flex-col">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Competition Date</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Players</th>
                        </thead>
                        <tbody>
                            <tr v-for="(competition, index) in competitions" :key="competition.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <router-link :to="{ name: 'competitions.show', params: { id: competition.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ competition.date | formatDate }}</router-link>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ playerCount(competition.date) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'SingleSeason',

    computed: {
        ...mapState(['seasons']),

        season () {
            return this.seasons[this.$route.params.id] || {}
        },

        competitions () {
            return this.$store.getters.seasonCompetitions(this.season.id)
        }
    },

    methods: {
        playerCount (date) {
            return this.$store.getters.competitionResults(date).length || 0
        }
    }
}
</script>
