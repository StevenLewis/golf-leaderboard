<template>
    <form @submit.prevent="submit">
        <div>
            <label for="name" class="sr-only">Name</label>
            <div class="flex mt-1 mb-2">
                <div class="flex-1 flex items-center w-full relative">
                    <input
                        id="name"
                        v-model.trim="name"
                        class="form-input block w-full mr-3 rounded-md shadow-sm sm:text-sm sm:leading-5"
                        :class="{ 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300' : errors.has('name') }"
                        placeholder="Player name..."
                        autocomplete="off"
                    />
                    <div class="flex items-center mr-3">
                        <button @click="isGuest = !isGuest" type="button" aria-pressed="false" aria-labelledby="toggleLabel" :class="isGuest ? 'bg-indigo-600' : 'bg-gray-200'" class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="sr-only">Use setting</span>
                            <span aria-hidden="true" :class="isGuest ? 'translate-x-5' : 'translate-x-0'" class="inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                        </button>
                        <span class="ml-3" id="toggleLabel">
                            <span class="text-sm font-medium text-gray-900">Guest?</span>
                        </span>
                    </div>
                </div>
                <button @click.prevent="submit" type="button" class="flex-none flex items-center px-3 py-2 ml-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                    {{ player ? 'Update' : 'Add' }} Player
                </button>
                <button v-if="player" @click.prevent="$emit('done')" type="button" class="inline-flex items-center px-3 py-2 ml-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>
            </div>
            <p v-if="errors.has('name')" class="my-2 text-sm text-red-600">{{ errors.first('name') }}</p>
        </div>
    </form>
</template>

<script>
import Errors from '@/classes/Errors'
import { CREATE_PLAYER, UPDATE_PLAYER } from '@/action-types'
import { mapGetters } from 'vuex'

export default {
    name: 'PlayerForm',

    props: {
        player: {
            type: Object,
            required: false,
            default: null
        }
    },

    data () {
        return {
            name: this.player ? this.player.name : '',
            isGuest: this.player ? this.player.isGuest : false,
            errors: new Errors()
        }
    },

    computed: {
        ...mapGetters(['players']),

        nameIsNotUnique () {
            const players = this.player ? [...this.players].filter(player => player.id !== this.player.id) : this.players

            return players.some(player => player.name.toLowerCase() === this.name.toLowerCase())
        }
    },

    watch: {
        name: function () {
            this.errors.clear()
        }
    },

    methods: {
        submit () {
            this.errors.clear()

            this.validate()
                .then(async () => {
                    await this.$store.dispatch(this.player ? UPDATE_PLAYER : CREATE_PLAYER, {
                        playerId: this.player ? this.player.id : null,
                        name: this.name,
                        isGuest: this.isGuest
                    })

                    this.$emit('done')
                    this.name = ''
                    this.guest = false
                })
        },

        // TODO: Move to validator
        validate () {
            return new Promise((resolve, reject) => {
                let errors = []

                if (this.name.length === 0) {
                    errors.push('We need their name')
                }

                if (!/^[a-zA-Z\s]*$/.test(this.name)) {
                    errors.push('Only letters and spaces please')
                }

                if (this.nameIsNotUnique) {
                    errors.push('This player already exists')
                }

                if (errors.length > 0) {
                    this.errors.record({ name: errors })
                    reject(this.errors)
                }

                resolve('Valid!')
            })
        }
    }
}
</script>
