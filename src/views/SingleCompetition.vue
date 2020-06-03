<template>
    <div id="competition">
        <header>
            <div class="mb-10 text-xs text-gray-500">
                <router-link :to="{ name: 'competitions.index' }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">Competitions</router-link>
                / <span>{{ competition.date | formatDate }}</span>
            </div>
        </header>

        <div v-if="user.loggedIn" class="max-w-md mb-10">
            <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900">
                Add new result
            </h3>
            <form @submit.prevent="submit">
                <div>
                    <div class="flex mt-1 mb-2">
                        <div class="flex-auto rounded-md shadow-sm">
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
                        <button @click.prevent="submit" type="button" class="flex-none flex items-center px-3 py-2 ml-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                            Add Result
                        </button>
                    </div>
                    <p v-if="errors.has('player')" class="my-2 text-sm text-red-600">{{ errors.first('player') }}</p>
                    <p v-if="errors.has('score')" class="my-2 text-sm text-red-600">{{ errors.first('score') }}</p>
                </div>
            </form>
        </div>

        <header>
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">{{ competition.date | formatDate }}</h1>
        </header>

        <div class="flex flex-col mb-10">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Player</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        </thead>
                        <tbody>
                            <tr v-for="(result, index) in results" :key="result.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ index + 1 }}</td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <router-link :to="{ name: 'players.show', params: { id: result.playerId } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ players[result.playerId].name }}</router-link>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.score }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RECORD_RESULT } from '../action-types'
import { mapState } from 'vuex'
import Errors from '../classes/Errors'

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
        ...mapState(['competitions', 'players', 'user']),

        competition () {
            return this.competitions[this.$route.params.id] || {}
        },

        results () {
            if (this.competition.date) {
                return this.$store.getters.competitionResults(this.competition.date) || []
            }
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
        submit () {
            this.errors.clear()

            this.validate()
                .then(() => {
                    this.$store.dispatch(RECORD_RESULT, {
                        playerId: this.player,
                        qualifying: this.qualifying,
                        score: this.score,
                        date: this.competition.date
                    })

                    this.score = 0
                    this.player = ''
                })
                .catch(() => {
                    console.log('Catch')
                    // Good catch!
                })
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
        }
    }
}
</script>
