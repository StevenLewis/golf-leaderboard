<template>
    <div id="players">
        <div v-if="user.loggedIn" class="max-w-lg mb-10">
            <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900">
                Add new player
            </h3>
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
                                <button @click="guest = !guest" type="button" aria-pressed="false" aria-labelledby="toggleLabel" :class="guest ? 'bg-indigo-600' : 'bg-gray-200'" class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span class="sr-only">Use setting</span>
                                    <span aria-hidden="true" :class="guest ? 'translate-x-5' : 'translate-x-0'" class="inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                                </button>
                                <span class="ml-3" id="toggleLabel">
                                    <span class="text-sm font-medium text-gray-900">Guest?</span>
                                </span>
                            </div>
                        </div>
                        <button @click.prevent="submit" type="button" class="flex-none flex items-center px-3 py-2 ml-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                            Add Player
                        </button>
                    </div>
                    <p v-if="errors.has('name')" class="my-2 text-sm text-red-600">{{ errors.first('name') }}</p>
                </div>
            </form>
        </div>
        <header>
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">Players</h1>
        </header>
        <div class="flex flex-col mb-10">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Player</th>
                        </thead>
                        <tbody>
                            <tr v-for="(player, index) in players" :key="player.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <router-link :to="{ name: 'players.show', params: { id: player.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ player.name }}</router-link>
                                    <template v-if="player.isGuest"> Guest</template>
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
import Errors from '../classes/Errors'
import { mapGetters } from 'vuex'
import { CREATE_PLAYER } from '@/action-types'

export default {
    data () {
        return {
            name: '',
            guest: false,
            errors: new Errors()
        }
    },

    computed: {
        ...mapGetters(['players', 'user']),

        nameIsNotUnique () {
            return this.players.some(player => player.name.toLowerCase() === this.name.toLowerCase())
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
                .then(() => {
                    this.$store.dispatch(CREATE_PLAYER, {
                        name: this.name,
                        isGuest: this.guest
                    })

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
