<template>
    <div v-if="competition" id="competition">
        <header>
            <div class="mb-10 text-xs text-gray-500">
                <router-link :to="{ name: 'seasons.show', params: { id: competition.seasonId } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">Back to season</router-link>
                / <span>{{ competition.date | formatDate }}</span>
            </div>
        </header>

        <header>
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">{{ competition.date | formatDate }}</h1>
            <competition-data :results="results" />
        </header>

        <div v-if="user.loggedIn" class="mb-10 flex justify-between items-end">
            <aside v-if="competition.recorded_at" class="flex-none">
                <p>Recorded At: <span class="text-purple-700">{{ competition.recorded_at | formatDate }}</span></p>
            </aside>
            <template v-else>
                <add-player :competition="competition" />
                <button @click.prevent="recordScores" type="button" class="flex-none flex items-center px-3 py-2 ml-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                    Record Scores
                </button>
            </template>
        </div>

        <results-table v-if="competition.isRecorded" :results="sortedResults" />

        <template v-else>
            <div v-if="errors.has('scores')" class="rounded-md bg-red-50 p-4 mb-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-red-800">
                            There were some errors with your scores
                        </h3>
                        <div class="mt-2 text-sm text-red-700">
                            <ul class="list-disc pl-5 space-y-1">
                                <li>
                                    {{  errors.first('scores') }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <score-sheet
                :results="results"
                :scores="scores"
                :countbacks="countbacks"
                @scores="scores = $event"
                @countbacks="countbacks = $event"
            />
        </template>
    </div>
</template>

<script>
import { PAY_WINNINGS, RECORD_COMPETITION, ENTER_SCORE } from '@/action-types'
import { mapState, mapGetters } from 'vuex'
import { prizeMoney } from '@/config/money'
import Errors from '@/classes/Errors'
import ResultsTable from '../components/ResultsTable'
import CompetitionData from '../components/CompetitionData'
import AddPlayer from '../components/AddPlayer'
import ScoreSheet from '../components/ScoreSheet'

export default {
    name: 'SingleCompetition',

    components: {
        ResultsTable,
        CompetitionData,
        AddPlayer,
        ScoreSheet
    },

    data () {
        return {
            qualifying: true,
            scores: [],
            countbacks: [],
            errors: new Errors()
        }
    },

    computed: {
        ...mapState(['user']),
        ...mapGetters(['findCompetition', 'competitionResults']),

        competition () {
            return this.findCompetition(this.$route.params.id)
        },

        results () {
            return this.competitionResults(this.competition.id)
        },

        sortedResults () {
            return [...this.results].sort((a, b) => {
                if (a.nett === b.nett) {
                    return b.countback - a.countback
                }

                return b.nett - a.nett
            })
        },

        prizes () {
            return prizeMoney[this.results.length] || [0, 0, 0]
        }
    },

    methods: {
        recordScores () {
            this.validate()
                .then(async () => {
                    await this.results.forEach((result, index) => {
                        this.$store.dispatch(ENTER_SCORE, {
                            resultId: result.id,
                            score: this.scores[index],
                            countback: this.countbacks[index]
                        })
                    })

                    await this.recordCompetition()
                })
                .catch(() => {
                    // Good Catch!
                })
        },

        async recordCompetition () {
            this.sortedResults.forEach((result, index) => {
                this.$store.dispatch(PAY_WINNINGS, {
                    playerId: result.playerId,
                    resultId: result.id,
                    winnings: this.prizes[index] || 0
                })
            })

            await this.$store.dispatch(RECORD_COMPETITION, this.competition.id)
        },

        validate () {
            return new Promise((resolve, reject) => {
                let errors = []

                if (this.scores.length < this.results.length) {
                    errors.push('We need all the scores')
                }

                if (this.scores.some(score => typeof score !== 'number')) {
                    errors.push('The scores must be a number')
                }

                if (errors.length > 0) {
                    this.errors.record({ scores: errors })
                    reject(this.errors)
                }

                resolve('Valid!')
            })
        }
    }
}
</script>
