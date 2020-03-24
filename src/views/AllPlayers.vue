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

        <div class="max-w-xs">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Add new player
            </h3>
            <p class=" mb-5 mt-1 text-sm leading-5 text-gray-500">
                Input their name and hit enter.
            </p>
            <form @submit.prevent="submit">
                <div>
                    <label for="name" class="sr-only">Name</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                        <input id="name" v-model.trim="name" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="Player name..." />
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CREATE_PLAYER } from '../action-types'

export default {
    data () {
        return {
            name: ''
        }
    },

    computed: {
        ...mapGetters(['players'])
    },

    methods: {
        submit () {
            if (this.name.length === 0) {
                return
            }

            this.$store.dispatch(CREATE_PLAYER, this.name)
            this.name = ''
        }
    }
}
</script>
