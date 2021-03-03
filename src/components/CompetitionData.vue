<template>
    <div class="mb-10 bg-white shadow overflow-hidden rounded-lg">
        <div class="px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-3">
                <div class="sm:col-span-1">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        No. of players
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900">
                        {{ competition.results.length }}
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
            </dl>
        </div>
    </div>
</template>

<script>
import { prizeMoney } from '../config/money'

export default {
    name: 'CompetitionData',

    props: {
        competition: {
            required: true,
            type: Object
        }
    },

    computed: {
        prizes () {
            return prizeMoney[this.competition.results.length] || [0, 0, 0]
        }
    }
}
</script>
