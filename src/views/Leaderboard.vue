<template>
    <div>
        <h1>Leaderboard</h1>
        <table>
            <thead>
                <th>Pos</th>
                <th>Player</th>
                <th>Results Count</th>
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
                    <td>{{ player.scores.length }}</td>
                    <td>{{ player.totalScore }}</td>
                    <td>{{ player.average }}</td>
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
