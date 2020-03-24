<template>
    <div class="mb-10 bg-white shadow overflow-hidden sm:rounded-lg">
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
                        Total Games
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ player.totalGames }}
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
                        Scores To Beat
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        <template v-if="player.scoresToBeat.length > 0">
                            {{ player.scoresToBeat[0] }}, {{ player.scoresToBeat[1] }}, {{ player.scoresToBeat[2] }}
                        </template>
                        <template v-else>
                            You need at least 10 Qualifying Scores
                        </template>
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

    computed: {
        ...mapGetters({
            players: 'leaderboard'
        }),

        player () {
            return this.players.find(player => player.id === this.$route.params.id)
        }
    }
}
</script>
