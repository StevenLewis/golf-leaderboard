<template>
    <div>
        <h3>Players</h3>
        <ul>
            <li v-for="player in players" :key="player.id">
                <router-link :to="{ name: 'players.show', params: { id: player.id } }">{{ player.name }}</router-link>
            </li>
        </ul>

        <form @submit.prevent="submit">
            <input type="text" v-model.trim="name" placeholder="Player name...">
        </form>
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
