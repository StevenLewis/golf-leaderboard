<template>
    <div id="players">
        <div v-if="user.loggedIn" class="max-w-lg mb-10">
            <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900">
                Add new player
            </h3>
            <PlayerForm />
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
import { mapGetters } from 'vuex'
import PlayerForm from '@/components/PlayerForm'

export default {
    components: {
        PlayerForm
    },

    computed: {
        ...mapGetters(['players', 'user'])
    }
}
</script>
