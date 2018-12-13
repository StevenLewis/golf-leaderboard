<template>
    <div>
        <h1>Leaderboard</h1>
        <table>
            <thead>
                <th>Pos</th>
                <th>Player</th>
                <th><strong>Top 10 Total</strong></th>
                <th>Total Games</th>
                <th>Total Qualifying Games</th>
                <th>Total Score</th>
                <th>Average</th>
                <th>10th Best</th>
                <th>9th Best</th>
                <th>8th Best</th>
            </thead>
            <tbody>
                <tr v-for="(player, index) in leaderboard" :key="player.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ player.name }}</td>
                    <td><strong>{{ player.topTenTotal }}</strong></td>
                    <td>{{ player.totalGames }}</td>
                    <td>{{ player.totalQualifyingGames }}</td>
                    <td>{{ player.totalQualifyingScore }}</td>
                    <td>{{ player.qualifyingAverage }}</td>
                    <td>{{ player.scoresToBeat[0] }}</td>
                    <td>{{ player.scoresToBeat[1] }}</td>
                    <td>{{ player.scoresToBeat[2] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['leaderboard'])
    }
}
</script>
