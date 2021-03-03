<template>
    <div v-if="player" id="player">
        <header>
            <div class="mb-5 text-xs text-gray-500">
                <router-link :to="{ name: 'players.index' }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">Players</router-link>
                / <span>{{ player.name }}</span>
            </div>
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">{{ player.name }}</h1>
        </header>

        <player-details v-if="player" :player="player" />

        <div class="flex flex-col">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        </thead>
                        <tbody>
                            <tr v-for="result in player.results" :key="result.id">
                                <td class="px-6 py-4 bg-white whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ resultDate(result) | formatDate }}</td>
                                <td class="px-6 py-4 bg-white whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.score }}</td>
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
import PlayerDetails from '../components/PlayerDetails'

export default {
    name: 'SinglePlayer',

    components: {
        PlayerDetails
    },

    computed: {
        ...mapGetters(['findPlayer', 'playerResults', 'findCompetition']),

        player () {
            return this.findPlayer(this.$route.params.id)
        }
    },

    methods: {
        resultDate (result) {
            return this.findCompetition(result.competitionId).date
        }
    }
}
</script>
