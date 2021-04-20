<template>
    <div v-if="leaderboard" id="leadeboard">
        <div class="flex flex-col mb-10 md:mb-24">
            <div class="overflow-x-auto -mx-2 md:mx-0">
                <div class="align-middle inline-block min-w-full overflow-hidden md:rounded-lg md:shadow md:border md:border-gray-100">
                    <table class="min-w-full">
                        <thead>
                            <th class="pl-4 pr-2 py-3 md:px-6 md:py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                            <th class="px-4 py-3 md:px-6 md:py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Player</th>
                            <th class="px-4 py-3 md:px-6 md:py-3 bg-gray-100 text-center md:text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"><strong>Top 10 Total</strong></th>
                            <th class="px-4 py-3 md:px-6 md:py-3 bg-gray-100 text-center md:text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Total Games</th>
                            <th class="hidden md:table-cell px-4 py-3 md:px-6 md:py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Qualifying Games</th>
                            <th class="hidden md:table-cell px-4 py-3 md:px-6 md:py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
                            <th class="hidden md:table-cell px-4 py-3 md:px-6 md:py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Average</th>
                            <th class="hidden md:table-cell px-4 py-3 md:px-6 md:py-3 bg-gray-100 text-center md:text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">10th Best</th>
                            <th class="hidden md:table-cell px-4 py-3 md:px-6 md:py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">9th Best</th>
                            <th class="hidden md:table-cell px-4 py-3 md:px-6 md:py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">8th Best</th>
                        </thead>
                        <tbody>
                            <router-link :to="{ name: 'players.show', params: { id: player.id } }" v-for="(player, index) in leaderboard" :key="player.id" :class="backgroundColor(index)" class="table-row">
                                <td class="pl-4 pr-2 py-3 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ index + 1 }}</td>
                                <td class="px-4 py-3 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-indigo-600">
                                    {{ player.name }}
                                    <span v-if="isFirst(index)" class="ml-1">🏆</span>
                                    <span v-if="isSweaty(index)" class="ml-1">😰</span>
                                </td>
                                <td class="px-4 py-3 md:px-6 md:py-4 whitespace-no-wrap text-sm text-center md:text-left leading-5 font-medium text-gray-500"><strong>{{ player.topTenTotal }}</strong></td>
                                <td class="px-4 py-3 md:px-6 md:py-4 whitespace-no-wrap text-sm text-center md:text-left leading-5 font-medium text-gray-500">{{ player.totalGames }}</td>
                                <td class="hidden md:table-cell px-4 py-3 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ player.totalQualifyingGames }}</td>
                                <td class="hidden md:table-cell px-4 py-3 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ player.totalQualifyingScore }}</td>
                                <td class="hidden md:table-cell px-4 py-3 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ player.qualifyingAverage }}</td>
                                <td class="hidden md:table-cell px-4 py-3 md:px-6 md:py-4 whitespace-no-wrap text-sm text-center md:text-left leading-5 font-medium text-gray-500">{{ player.scoresToBeat[0] }}</td>
                                <td class="hidden md:table-cell px-4 py-3 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ player.scoresToBeat[1] }}</td>
                                <td class="hidden md:table-cell px-4 py-3 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ player.scoresToBeat[2] }}</td>
                            </router-link>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import leaderboardColors from '@/config/leaderboardColors'

export default {
    name: 'Leaderboard',

    props: {
        seasonId: {
            required: false,
            type: [String, null],
            default: null
        }
    },

    computed: {
        ...mapGetters(['presentLeaderboard']),

        leaderboard () {
            return this.presentLeaderboard(this.seasonId)
        }
    },

    methods: {
        backgroundColor (index) {
            if (index <= 11) {
                return leaderboardColors[index]
            }

            if (index <= 35) {
                return index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }

            return index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'
        },

        isFirst (index) {
            return index === 0
        },

        isSweaty (index) {
            return index === 15
        }
    }
}
</script>
