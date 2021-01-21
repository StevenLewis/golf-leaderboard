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
            <competition-data :competition="competition" />
        </header>

        <div v-if="user.loggedIn" class="mb-10 flex justify-between items-end">
            <aside v-if="competition.recorded_at" class="flex-none">
                <p>Recorded At: <span class="text-purple-700">{{ competition.recorded_at | formatDate }}</span></p>
            </aside>
            <template v-else>
                <add-player :competition="competition" />
                <form @submit.prevent="recordCompetition" class="flex-none">
                    <button @click.prevent="recordCompetition" type="button" class="flex-none flex items-center px-3 py-2 ml-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Record Competition
                    </button>
                </form>
            </template>
        </div>

        <template v-if="competition.isRecorded">
            <results-table :results="competition.results" />
            <ties v-if="hasTies" ref="ties" :ties="ties" @resolved="recordCompetition" />
        </template>

        <score-sheet v-else :competition="competition" />
    </div>
</template>

<script>
import { PAY_WINNINGS, RECORD_COMPETITION } from '../action-types'
import { mapState, mapGetters } from 'vuex'
import { prizeMoney } from '../config/money'
import Ties from '../components/Ties'
import ResultsTable from '../components/ResultsTable'
import CompetitionData from '../components/CompetitionData'
import AddPlayer from '../components/AddPlayer'
import ScoreSheet from '../components/ScoreSheet'

export default {
    name: 'SingleCompetition',

    components: {
        Ties,
        ResultsTable,
        CompetitionData,
        AddPlayer,
        ScoreSheet
    },

    data () {
        return {
            qualifying: true,
            ties: []
        }
    },

    computed: {
        ...mapState(['user']),
        ...mapGetters(['findCompetition']),

        competition () {
            return this.findCompetition(this.$route.params.id)
        },

        // Can we put in Competition model?
        prizes () {
            return prizeMoney[this.competition.results.length] || [0, 0, 0]
        },

        firstTies () {
            return this.competition.results.filter(result => result.nett === this.competition.results[0].nett && result.countback === 0)
        },

        secondTies () {
            return this.competition.results.filter(result => {
                return result.nett === this.competition.results[1].nett &&
                result.countback === 0 &&
                  !this.firstTies.includes(result)
            })
        },

        thirdTies () {
            return this.competition.results.filter(result => {
                return result.nett === this.competition.results[2].nett &&
              result.countback === 0 &&
              !this.firstTies.includes(result) &&
              !this.secondTies.includes(result)
            })
        },

        fourthTies () {
            return this.competition.results.filter(result => {
                return result.nett === this.competition.results[3].nett &&
              result.countback === 0 &&
              !this.firstTies.includes(result) &&
              !this.secondTies.includes(result) &&
              !this.thirdTies.includes(result)
            })
        },

        hasTies () {
            return this.firstTies.length > 1 ||
            this.secondTies.length > 1 ||
            this.thirdTies.length > 1 ||
            this.fourthTies.length > 1
        }
    },

    methods: {
        async recordCompetition () {
            this.ties = []

            if (this.hasTies) {
                this.ties.push(this.firstTies, this.secondTies, this.thirdTies, this.fourthTies)
                this.$refs['ties'].show()
            } else {
                await this.competition.results.forEach((result, index) => {
                    this.$store.dispatch(PAY_WINNINGS, {
                        playerId: result.player.id,
                        resultId: result.id,
                        winnings: this.prizes[index] || 0
                    })
                })

                await this.$store.dispatch(RECORD_COMPETITION, this.competition.id)
            }
        }
    }
}
</script>
