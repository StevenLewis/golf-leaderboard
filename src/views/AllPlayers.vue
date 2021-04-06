<template>
    <div id="players">
        <div v-if="user.loggedIn" class="max-w-lg mb-10">
            <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900">
                Add new player
            </h3>
            <PlayerForm />
        </div>
        <header>
            <h1 class="mb-2.5 text-3xl font-bold leading-tight text-gray-900">Players</h1>
        </header>
        <div class="flex flex-col mb-10">
            <div class="py-2 overflow-x-auto -mx-2 md:mx-0">
                <div class="align-middle inline-block min-w-full overflow-hidden md:rounded-lg md:shadow md:border md:border-gray-100">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Player</th>
                        </thead>
                        <tbody>
                            <router-link v-for="(player, index) in players" :key="player.id" :to="{ name: 'players.show', params: { id: player.id } }" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'" class="table-row">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <span class="text-indigo-600">{{ player.name }}</span>
                                    <template v-if="player.isGuest"> Guest</template>
                                </td>
                            </router-link>
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
