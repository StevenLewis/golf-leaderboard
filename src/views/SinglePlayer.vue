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
                    <td>{{ result.date | formatDate }}</td>
                    <td>{{ result.score }}</td>
                </tr>
            </tbody>
        </table>
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
import { mapState } from 'vuex'

export default {
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
