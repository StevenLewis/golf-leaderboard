<template>
    <div class="mb-5">
        <div class="flex">
            <div class="flex-1 mr-2 py-4 px-5 shadow overflow-hidden rounded-lg" :class="competition.isChampionshipDay ? 'bg-orange-500' : 'bg-indigo-600'">
                <p class="text-sm font-medium text-white">Players</p>
                <p class="text-4xl font-medium text-white">{{ results.length }}</p>
            </div>
            <div class="flex-1 ml-2 py-4 px-5 bg-white shadow overflow-hidden rounded-lg">
                <p class="text-sm font-medium text-gray-500">Prize Money</p>
                <div class="flex text-sm">
                    <span class="w-10">1st</span>{{ prizes[0] | sterling }} <br>
                </div>
                <div class="flex text-sm">
                    <span class="w-10">2nd</span>{{ prizes[1] | sterling }} <br>
                </div>
                <div class="flex text-sm">
                    <span class="w-10">3rd</span>{{ prizes[2] | sterling }} <br>
                </div>
            </div>
        </div>

        <div v-if="competition.bonusesAvailable" class="mt-3 mr-1 text-right">
            <div class="mt-1 text-sm leading-5 text-gray-900">
                <p v-if="competition.isChampionshipDay" class="text-orange-500">6 Bonus Points Available</p>
                <p v-else-if="competition.isNovember" class="text-green-500">4 Bonus Points Available</p>
                <p v-else-if="competition.isOctober" class="text-blue-500">2 Bonus Points Available</p>
                <p v-else>None</p>
            </div>
        </div>
    </div>
</template>

<script>
import { prizeMoney } from '@/config/money'

export default {
    name: 'CompetitionData',

    props: {
        competition: {
            type: Object,
            required: true
        },

        results: {
            type: Array,
            required: true
        }
    },

    computed: {
        prizes () {
            return prizeMoney[this.results.length] || [0, 0, 0]
        }
    }
}
</script>
