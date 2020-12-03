<template>
    <div id="create">
        <header>
            <div class="mb-10 text-xs text-gray-500">
                <router-link :to="{ name: 'seasons.show', params: { id: $route.params.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">Back to season</router-link>
                / <span>Create Competition</span>
            </div>
        </header>

        <header class="md:flex justify-between">
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">Create Competition</h1>
            <button v-if="!noPlayers" @click.prevent="createCompetition" class="hidden md:flex flex-none justify-center items-center px-3 py-2 ml-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                Create Competition
            </button>
        </header>

        <div v-if="user.loggedIn" class="md:flex items-start mb-10">
            <form @submit.prevent="submit" class="flex-1 max-w-md mb-10">
                <div class="mb-4 md:mb-10">
                    <label for="name" class="text-sm font-medium">Date</label>
                    <div class="flex mt-1 mb-2">
                        <div class="w-full relative rounded-md shadow-sm">
                            <datepicker v-model="date" :input-class="datepickerClass" />
                        </div>
                    </div>
                    <p v-if="errors.has('date')" class="my-2 text-sm text-red-600">{{ errors.first('date') }}</p>
                </div>
                <div class="relative">
                    <label for="name" class="text-sm font-medium">Add Player</label>
                    <div class="mt-1 mb-2">
                        <div class="w-full relative rounded-md shadow-sm mb-2">
                            <input
                                id="name"
                                v-model="query"
                                class="form-input block w-full sm:text-sm sm:leading-5"
                                placeholder="Player name..."
                                autocomplete="off"
                                @keyup="search"
                            />
                        </div>
                        <div v-if="results.length > 0" v-shortkey="{up: ['arrowup'], down: ['arrowdown'], enter: ['enter']}" @shortkey="shortcut" class="absolute w-full bg-white shadow rounded-md overflow-hidden">
                            <div v-for="(result, index) in results" :key="result.id" @click.prevent="enterPlayer(index)" class="block p-2 cursor-pointer" :class="{ 'bg-gray-200' : isActive(index) }">{{ result.name }}</div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="flex-1 mb-10 md:ml-10">
                <p class="mb-4 text-sm font-medium">Field</p>
                <ul class="bg-white shadow overflow-hidden sm:rounded-md">
                    <player v-for="player in entered" :key="player.id" :player="player" @removed="removePlayer" />
                </ul>
            </div>
            <footer class="md:hidden mb-10">
                <button v-if="!noPlayers" @click.prevent="createCompetition" class="flex-none justify-center items-center w-full px-3 py-4 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                    Create Competition
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Errors from '../classes/Errors'
import { CREATE_COMPETITION } from '../action-types'
import Datepicker from 'vuejs-datepicker'
import Player from '../components/PlayerCard'

export default {
    name: 'CreateCompetition',

    components: {
        Datepicker,
        Player
    },

    data () {
        return {
            date: new Date(),
            entered: [],
            query: '',
            errors: new Errors(),
            results: [],
            index: 0
        }
    },

    computed: {
        ...mapGetters(['user', 'players']),

        datepickerClass () {
            let string = this.errors.has('date') ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 ' : ''

            return string + 'form-input block w-full sm:text-sm sm:leading-5'
        },

        availablePlayers () {
            return this.players.filter(player => {
                return !this.entered.some(item => item.id === player.id)
            })
        },

        noPlayers () {
            return this.entered.length === 0
        }
    },

    watch: {
        date: function () {
            this.errors.clear()
        }
    },

    created () {
        this.date.setHours(0, 0, 0, 0)
    },

    methods: {
        isActive (index) {
            return this.index === index
        },

        shortcut (event) {
            switch (event.srcKey) {
            case 'up':
                this.navigateUp()
                break
            case 'down':
                this.navigateDown()
                break
            case 'enter':
                this.enterPlayer()
                break
            }
        },

        navigateDown () {
            this.index = this.index === this.results.length - 1 ? 0 : this.index + 1
        },

        navigateUp () {
            this.index = this.index === 0 ? this.results.length - 1 : this.index - 1
        },

        enterPlayer (index) {
            if (typeof index === 'number') {
                this.entered.push(this.results[index])
            } else {
                this.entered.push(this.results[this.index])
            }

            this.results = []
            this.query = ''
            this.index = 0
        },

        removePlayer (id) {
            this.entered = this.entered.filter(player => player.id !== id)
        },

        search () {
            this.$search(this.query, this.availablePlayers, { keys: ['name'], threshold: 0.2, ignoreLocation: true, minMatchCharLength: 2 }).then(results => {
                this.results = results
            })
        },

        async createCompetition () {
            this.errors.clear()

            await this.validate()

            const response = await this.$store.dispatch(CREATE_COMPETITION, {
                date: this.date,
                seasonId: this.$route.params.id,
                players: this.entered
            })

            await this.$router.push({ name: 'competitions.show', params: { id: response.id } })
        },

        validate () {
            return new Promise((resolve, reject) => {
                let errors = []

                if (this.date.length === 0) {
                    errors.push('We need the date')
                }

                if (this.noPlayers) {
                    errors.push('You need to add the players first')
                }

                if (errors.length > 0) {
                    this.errors.record({ date: errors })
                    reject(this.errors)
                }

                resolve('Valid!')
            })
        }
    }
}
</script>
