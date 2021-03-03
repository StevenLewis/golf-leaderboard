<template>
    <form @submit.prevent="addPlayer" class="flex-none">
        <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900">
            Add another player
        </h3>
        <div>
            <div class="flex mt-1">
                <div class="w-64 flex-auto rounded-md shadow-sm">
                    <select v-model="player"
                            class="block form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            :class="{ 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300' : errors.has('player') }"
                    >
                        <option value="" disabled selected>Select player</option>
                        <option v-for="player in missingPlayers" :key="player.id" :value="player">{{ player.name }}</option>
                    </select>
                </div>
                <button @click.prevent="addPlayer" type="button" class="flex-none flex items-center px-3 py-2 ml-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                    Add Player
                </button>
            </div>
            <p v-if="errors.has('player')" class="mt-2 text-sm text-red-600">{{ errors.first('player') }}</p>
        </div>
    </form>
</template>

<script>
import Errors from '../classes/Errors'
import { ENTER_PLAYER } from '@/action-types'
import { entryFee } from '@/config/money'
import { mapGetters } from 'vuex'

export default {
    name: 'AddPlayer',

    props: {
        competition: {
            required: true,
            type: Object
        }
    },

    data () {
        return {
            player: {},
            errors: new Errors()
        }
    },

    computed: {
        ...mapGetters(['players']),

        missingPlayers () {
            return this.players.filter(player => {
                return !this.competition.results.some(result => result.playerId === player.id)
            })
        }
    },

    watch: {
        player: function () {
            this.errors.clear('player')
        }
    },

    methods: {
        addPlayer () {
            this.errors.clear()

            this.validate()
                .then(() => {
                    this.$store.dispatch(ENTER_PLAYER, {
                        playerId: this.player.id,
                        competitionId: this.competition.id,
                        qualifying: true,
                        cuts: this.player.cuts,
                        entryFee
                    })

                    this.player = {}
                })
                .catch(() => {
                    // Good catch!
                })
        },

        validate () {
            return new Promise((resolve, reject) => {
                let errors = []

                if (this.hasAlreadyEntered(this.player.id)) {
                    errors.push('This player has already entered')
                }

                if (errors.length > 0) {
                    this.errors.record({ player: errors })
                    reject(this.errors)
                }

                resolve('Valid!')
            })
        },

        hasAlreadyEntered (id) {
            return this.competition.results.some(result => result.playerId === id)
        }
    }
}
</script>
