<template>
    <div>
        <h3>Player: {{ player.name }}</h3>
        <br>
        <table>
            <thead>
                <th>Date</th>
                <th>Score</th>
            </thead>
            <tbody>
                <tr v-for="result in results" :key="result.id">
                    <td>{{ result.date }}</td>
                    <td>{{ result.score }}</td>
                </tr>
            </tbody>
        </table>

        <form @submit.prevent="submit">
            <input type="text" v-model.number="score" placeholder="Score...">
            <input type="date" v-model="date">
        </form>
    </div>
</template>

<style lang="less">
    table {
        text-align: left;
        margin: 0 auto;

        td, th {
            padding: 2px 10px;
        }
    }
</style>

<script>
import { RECORD_RESULT } from '../action-types'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            score: 0,
            date: '',
            qualifying: true
        }
    },

    methods: {
        submit () {
            if (this.score.length === 0 || this.date.length === 0) {
                return
            }

            this.$store.dispatch(RECORD_RESULT, { player: this.player, qualifying: this.qualifying, score: this.score, date: new Date(this.date) })
            this.score = 0
            this.date = ''
        }
    },

    computed: {
        ...mapState(['players']),

        player () {
            return this.players[this.$route.params.id] || {}
        },
        results () {
            return this.$store.getters.playerResults(this.$route.params.id) || []
        }
    }
}
</script>
