<template>
  <div>
    <header>
      <h4>{{ competition.date | formatDate }}</h4>
    </header>

    <table>
      <thead>
        <th>Pos</th>
        <th>Name</th>
        <th>Score</th>
      </thead>
      <tbody>
        <tr v-for="(result, index) in results" :key="result.id">
          <td>{{ index + 1 }}</td>
          <td>Player</td>
          <td>{{ result.score }}</td>
        </tr>
      </tbody>
    </table>

    <h5>New Result</h5>
    <form @submit.prevent="submit">
      <select v-model="player">
        <option v-for="player in players" :key="player.id" :value="player.id">{{ player.name }}</option>
      </select>
      <input type="text" v-model.number="score" placeholder="Score...">
    </form>
  </div>
</template>

<script>
import { RECORD_RESULT } from '../action-types'
import { mapState } from 'vuex'

export default {
    name: 'SingleCompetition',

    data () {
        return {
            score: 0,
            player: '',
            qualifying: true
        }
    },

    computed: {
        ...mapState(['competitions', 'players']),

        competition () {
            return this.competitions[this.$route.params.id] || {}
        },

        results () {
            return this.$store.getters.competitionResults(this.competition.date) || []
        }
    },

    methods: {
        submit () {
            if (this.score.length === 0 || this.player.length === 0) {
                return
            }

            this.$store.dispatch(RECORD_RESULT, {
                playerId: this.player,
                qualifying: this.qualifying,
                score: this.score,
                date: this.competition.date
            })
            this.score = 0
            this.date = ''
        }
    }
}
</script>
