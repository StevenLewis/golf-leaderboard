<template>
    <div v-if="player" class="mb-10 bg-white shadow overflow-hidden rounded-lg">
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
                        {{ player.qualifyingResults.length }}
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
                        {{ player.bestScore }}
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
                        {{ player.totalFees | sterling }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Winnings
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ player.totalWinnings | sterling }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Nett Profit
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ player.totalProfit | sterling }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Cuts
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ player.cuts }}
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>

<script>
import Details from '@/classes/PlayerStats'
export default {
    name: 'PlayerDetails',

    props: {
        results: {
            type: Array,
            required: true
        }
    },

    computed: {
        player () {
            return new Details(this.results)
        }
    }
}
</script>
