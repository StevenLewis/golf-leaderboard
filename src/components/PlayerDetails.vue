<template>
    <div v-if="player" class="mb-10 bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-3">
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Top 10 Total
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ player.topTenTotal }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Total Qualifying Games
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ player.totalQualifyingGames }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Total Score
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ player.totalQualifyingScore }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Average Score
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ player.qualifyingAverage }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Best Score
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ bestScore }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Scores To Beat
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        <template v-if="player.scoresToBeat.length > 2">
                            {{ player.scoresToBeat[0] }}, {{ player.scoresToBeat[1] }}, {{ player.scoresToBeat[2] }}
                        </template>
                        <template v-else>
                            You need at least 10 Qualifying Scores
                        </template>
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Entry Fees
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ fees | sterling }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Winnings
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ winnings | sterling }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Nett Profit
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ profit | sterling }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Cuts
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ cuts }}
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'PlayerDetails',

    props: {
        player: {
            type: Object,
            required: true
        }
    },

    computed: {
        ...mapGetters({
            players: 'leaderboard'
        }),
        ...mapGetters(['playerFees', 'playerWinnings', 'playerResults', 'playerProfit', 'playerCuts']),

        results () {
            return this.playerResults(this.$route.params.id) || []
        },

        bestScore () {
            if (this.results) {
                return Math.max(...this.results.map(result => result.score))
            }

            return 0
        },

        fees () {
            return this.playerFees(this.$route.params.id)
        },

        winnings () {
            return this.playerWinnings(this.$route.params.id)
        },

        profit () {
            return this.playerProfit(this.$route.params.id)
        },

        cuts () {
            return this.playerCuts(this.$route.params.id)
        }
    }
}
</script>
