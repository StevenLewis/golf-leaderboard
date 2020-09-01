<template>
    <div v-if="season" id="competition">
        <header>
            <div class="mb-10 text-xs text-gray-500">
                <router-link :to="{ name: 'seasons.show', params: { id: season.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">Back to season</router-link>
                / <span>{{ competition.date | formatDate }}</span>
            </div>
        </header>

        <div v-if="user.loggedIn" class="mb-10 flex justify-between items-end">
            <aside v-if="competition.recorded_at" class="flex-none">
                <p>Recorded At: <span class="text-purple-700">{{ competition.recorded_at | formatDate }}</span></p>
            </aside>
            <template v-else>
                <form @submit.prevent="recordResult" class="flex-none">
                    <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900">
                        Add new result
                    </h3>
                    <div>
                        <div class="flex mt-1 mb-2">
                            <div class="w-64 flex-auto rounded-md shadow-sm">
                                <select v-model="player"
                                        class="block form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        :class="{ 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300' : errors.has('player') }"
                                >
                                    <option value="" disabled selected>Select player</option>
                                    <option v-for="player in players" :key="player.id" :value="player.id">{{ player.name }}</option>
                                </select>
                            </div>
                            <input type="text"
                                   v-model.number="score"
                                   placeholder="Score..."
                                   class="w-16 form-input block ml-2 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                   :class="{ 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300' : errors.has('score') }"
                            />
                            <button @click.prevent="recordResult" type="button" class="flex-none flex items-center px-3 py-2 ml-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                                Add Result
                            </button>
                        </div>
                        <p v-if="errors.has('player')" class="my-2 text-sm text-red-600">{{ errors.first('player') }}</p>
                        <p v-if="errors.has('score')" class="my-2 text-sm text-red-600">{{ errors.first('score') }}</p>
                    </div>
                </form>
                <form @submit.prevent="recordCompetition" class="flex-none">
                    <button @click.prevent="recordCompetition" type="button" class="flex-none flex items-center px-3 py-2 ml-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Record Competition
                    </button>
                </form>
            </template>
        </div>

        <header>
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">{{ competition.date | formatDate }}</h1>
            <div class="mb-10 bg-white shadow overflow-hidden sm:rounded-lg">
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
                    </dl>
                </div>
            </div>
        </header>

        <div class="flex flex-col mb-10">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Player</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Score</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Cuts</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nett</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Winnings</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                        </thead>
                        <tbody>
                            <tr v-for="(result, index) in results" :key="result.id" :class="background(index)">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ index + 1 }}</td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <router-link :to="{ name: 'players.show', params: { id: result.player.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ result.player.name }}</router-link>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.score }}</td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.cuts }}</td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.score - result.cuts }}</td>
                                <td v-if="prizes" class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ prizes[index] | sterling }}</td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <svg v-if="user.loggedIn && !competition.recorded_at" @click.prevent="removeResult(result.id)" viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer">
                                        <path class="heroicon-ui" d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"/>
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ENTER_PLAYER, RECORD_COMPETITION, RECORD_RESULT, REMOVE_RESULT } from '../action-types'
import { mapState, mapGetters } from 'vuex'
import Errors from '../classes/Errors'
import { prizeMoney, entryFee } from '../config/money'

export default {
    name: 'SingleCompetition',

    data () {
        return {
            score: 0,
            player: '',
            qualifying: true,
            errors: new Errors()
        }
    },

    computed: {
        ...mapState(['competitions', 'players', 'user', 'seasons']),
        ...mapGetters(['competitionResults', 'playerCuts']),

        competition () {
            return this.competitions[this.$route.params.id] || {}
        },

        season () {
            return this.seasons[this.competition.seasonId]
        },

        results () {
            if (this.competition.date) {
                return this.competitionResults(this.competition.id) || []
            }

            return []
        },

        prizes () {
            return prizeMoney[this.results.length] || [0, 0, 0]
        }
    },

    watch: {
        player: function () {
            this.errors.clear('player')
        },

        score: function () {
            this.errors.clear('score')
        }
    },

    methods: {
        async recordCompetition () {
            await this.results.forEach((result, index) => {
                this.$store.dispatch(ENTER_PLAYER, {
                    player: result.player.id,
                    result: result.id,
                    winnings: this.prizes[index] || 0
                })
            })

            await this.$store.dispatch(RECORD_COMPETITION, this.competition.id)
        },

        recordResult () {
            this.errors.clear()

            this.validate()
                .then(() => {
                    const cuts = this.playerCuts(this.player)

                    this.$store.dispatch(RECORD_RESULT, {
                        playerId: this.player,
                        competitionId: this.competition.id,
                        qualifying: this.qualifying,
                        score: this.score,
                        date: this.competition.date,
                        cuts,
                        entryFee,
                        winnings: 0
                    })

                    this.score = 0
                    this.player = ''
                })
                .catch(() => {
                    // Good catch!
                })
        },

        removeResult (id) {
            this.$store.dispatch(REMOVE_RESULT, id)
        },

        validate () {
            return new Promise((resolve, reject) => {
                let playerErrors = []
                let scoreErrors = []

                if (this.player.length === 0) {
                    playerErrors.push('We need the player')
                }

                if (this.hasAlreadyEntered(this.player)) {
                    playerErrors.push('This player has already entered')
                }

                if (this.score.length === 0) {
                    scoreErrors.push('We need the score')
                }

                if (this.score < 0) {
                    scoreErrors.push('You cannot score below 0')
                }

                if (typeof this.score !== 'number') {
                    scoreErrors.push('The score should be a number')
                }

                if (playerErrors.length > 0) {
                    this.errors.record({ player: playerErrors })
                    reject(this.errors)
                }

                if (scoreErrors.length > 0) {
                    this.errors.record({ score: scoreErrors })
                    reject(this.errors)
                }

                resolve('Valid!')
            })
        },

        hasAlreadyEntered (player) {
            return this.results.some(result => result.playerId === player)
        },

        background (index) {
            switch (index) {
            case 0:
                return 'bg-yellow-100 bg-opacity-50'
            case 1:
                return 'bg-blue-100 bg-opacity-50'
            case 2:
                return 'bg-orange-100 bg-opacity-50'
            default:
                return index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            }
        }
    }
}
</script>
