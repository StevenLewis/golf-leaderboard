<template>
    <div v-if="player">
        <div class="mb-4 py-4 px-5 bg-white shadow overflow-hidden rounded-lg">
            <div class="flex mb-2">
                <div class="mr-8">
                    <p class="text-sm font-medium">Top 10 Total</p>
                    <p class="text-4xl font-medium text-indigo-600">{{ stats.topTenTotal }}</p>
                </div>
                <div class="mr-8">
                    <p class="text-sm font-medium">Best Score</p>
                    <p class="text-4xl font-medium text-indigo-600">{{ stats.bestScore }}</p>
                </div>
                <div>
                    <p class="text-sm font-medium">Cuts</p>
                    <p class="text-4xl font-medium text-indigo-600">{{ player.cuts }}</p>
                </div>
            </div>
            <div>
                <p class="text-sm font-medium">Scores to Beat</p>
                <p class="text-4xl font-medium text-gray-400">{{ stats.scoresToBeat[0] }}, {{ stats.scoresToBeat[1] }}, {{ stats.scoresToBeat[2] }}</p>
            </div>
        </div>

        <div class="flex">
            <div class="flex-1 mr-2 py-4 px-5 bg-white shadow overflow-hidden rounded-lg">
                <p class="text-sm font-medium">Entry Fees</p>
                <p class="text-sm font-medium text-gray-500 mb-2">{{ stats.totalFees | sterling }}</p>
                <p class="text-sm font-medium">Winnings</p>
                <p class="text-sm font-medium text-gray-500 mb-2">{{ stats.totalWinnings | sterling }}</p>
                <p class="text-sm font-medium">Net Profit</p>
                <p class="text-sm font-medium" :class="isNegative ? 'text-red-400' : 'text-green-400'">{{ stats.totalProfit | sterling }}</p>
            </div>
            <div class="flex-1 ml-2 py-4 px-5 bg-indigo-600 shadow overflow-hidden rounded-lg">
                <p class="text-sm font-medium text-white">Qual. Games</p>
                <p class="text-4xl font-medium text-white mb-2 leading-none">{{ stats.qualifyingResults.length }}</p>
                <p class="text-sm font-medium text-white">Avg. Scores</p>
                <p class="text-4xl font-medium text-white leading-none">{{ stats.qualifyingAverage }}</p>
            </div>
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
        },

        isNegative () {
            return Math.sign(this.stats.totalProfit) === -1
        }
    }
}
</script>
