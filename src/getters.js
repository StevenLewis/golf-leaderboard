export default {
    players (state) {
        return Object.values(state.players).sort((a, b) => {
            if (a.name.toLowerCase() === b.name.toLowerCase()) {
                return 0
            }

            return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1
        })
    },
    playerResults: (state) => (id) => {
        return Object.values(state.results).filter(result => result.playerId === id).sort((a, b) => a.date - b.date)
    },
    playerScores: (state, getters) => (id) => {
        return getters.playerResults(id).sort((a, b) => a.score - b.score).map(player => player['score']).slice(-10)
    },
    playerTotalScore: (state, getters) => (id) => {
        return getters.playerScores(id).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    },
    playerAverage: (state, getters) => (id) => {
        return getters.playerTotalScore(id) / 10
    },
    playerScoresToBeat: (state, getters) => (id) => {
        return getters.playerScores(id).slice(0, 3)
    },
    leaderboard: (state, getters) => {
        let leaderboard = Object.values(state.players)

        leaderboard.forEach((player) => {
            player.scores = getters.playerScores(player.id)
            player.totalScore = getters.playerTotalScore(player.id)
            player.average = getters.playerAverage(player.id)
            player.scoresToBeat = getters.playerScoresToBeat(player.id)
        })

        return leaderboard
    }
}
