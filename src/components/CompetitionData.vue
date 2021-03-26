<template>
    <div class="mb-10 bg-white shadow overflow-hidden rounded-lg">
        <div class="px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-3">
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        No. of players
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ results.length }}
                    </dd>
                </div>
                <div v-if="prizes" class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Prize money
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        <div class="flex">
                            <span class="w-10">1st</span>{{ prizes[0] | sterling }} <br>
                        </div>
                        <div class="flex">
                            <span class="w-10">2nd</span>{{ prizes[1] | sterling }} <br>
                        </div>
                        <div class="flex">
                            <span class="w-10">3rd</span>{{ prizes[2] | sterling }} <br>
                        </div>
                    </dd>
                </div>
                <div v-if="competition.bonusesAvailable" class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Bonuses
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        <p v-if="competition.isChampionshipDay" class="text-orange-500">6 Bonus Points Available</p>
                        <p v-else-if="competition.isNovember" class="text-green-500">4 Bonus Points Available</p>
                        <p v-else-if="competition.isOctober" class="text-blue-500">2 Bonus Points Available</p>
                        <p v-else>None</p>
                    </dd>
                </div>
            </dl>
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
