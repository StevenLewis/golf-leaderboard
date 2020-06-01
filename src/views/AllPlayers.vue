<template>
    <div id="players">
        <header>
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">Players</h1>
        </header>
        <div class="flex flex-col mb-10">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Player</th>
                        </thead>
                        <tbody>
                            <tr v-for="(player, index) in players" :key="player.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <router-link :to="{ name: 'players.show', params: { id: player.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ player.name }}</router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div v-if="user.loggedIn" class="max-w-xs">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Add new player
            </h3>
            <p class="mb-5 mt-1 text-sm leading-5 text-gray-500">
                Input their name and hit enter.
            </p>
            <form @submit.prevent="submit">
                <div>
                    <label for="name" class="sr-only">Name</label>
                    <div class="mt-1 mb-2 relative rounded-md shadow-sm">
                        <input
                            id="name"
                            v-model.trim="name"
                            class="form-input block w-full sm:text-sm sm:leading-5"
                            :class="{ 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300' : errors.has('name') }"
                            placeholder="Player name..."
                            autocomplete="off"
                        />
                    </div>
                    <p v-if="errors.has('name')" class="my-2 text-sm text-red-600">{{ errors.first('name') }}</p>
                    <button @click.prevent="submit" type="button" class="flex items-center px-3 py-2 ml-auto border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Add Player
                    </button>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import Errors from '../classes/Errors'
import { mapGetters } from 'vuex'
import { CREATE_PLAYER } from '../action-types'

export default {
    data () {
        return {
            name: '',
            errors: new Errors()
        }
    },

    computed: {
        ...mapGetters(['players', 'user']),

        nameIsNotUnique () {
            return this.players.some(player => player.name.toLowerCase() === this.name.toLowerCase())
        }
    },

    methods: {
        submit () {
            this.errors.clear()

            this.validate()
                .then(() => {
                    this.$store.dispatch(CREATE_PLAYER, this.name)
                    this.name = ''
                })
                .catch(() => {
                    // Good catch!
                })
        },

        validate () {
            return new Promise((resolve, reject) => {
                let errors = []

                if (this.name.length === 0) {
                    errors.push('We need their name!')
                }

                if (!/^[a-zA-Z\s]*$/.test(this.name)) {
                    errors.push('Only letters and spaces please!')
                }

                if (this.nameIsNotUnique) {
                    errors.push('This player already exists!')
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
