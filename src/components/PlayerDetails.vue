<template>
    <div v-if="player" class="mb-10 bg-white shadow overflow-hidden rounded-lg">
        <div class="px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-3">
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Top 10 Total
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ stats.topTenTotal }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Total Qualifying Games
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ stats.qualifyingResults.length }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Total Score
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ stats.totalQualifyingScore }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Average Score
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ stats.qualifyingAverage }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Best Score
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ stats.bestScore }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Scores To Beat
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ stats.scoresToBeat[0] }}, {{ stats.scoresToBeat[1] }}, {{ stats.scoresToBeat[2] }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Entry Fees
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ stats.totalFees | sterling }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Winnings
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ stats.totalWinnings | sterling }}
                    </dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Nett Profit
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ stats.totalProfit | sterling }}
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
import Stats from '@/classes/PlayerStats'
export default {
    name: 'PlayerDetails',

    props: {
        player: {
            type: Object,
            required: true
        },

        results: {
            type: Array,
            required: true
        }
    },

    computed: {
        stats () {
            return new Stats(this.results)
        }
    }
}
</script>
