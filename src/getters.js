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
    qualifyingResults: (state, getters) => (id) => {
        return getters.playerResults(id).filter(result => result.qualifying)
    },
    qualifyingScores: (state, getters) => (id) => {
        return getters.qualifyingResults(id).sort((a, b) => a.score - b.score).map(player => player.score)
    },
    qualifyingTotalScore: (state, getters) => (id) => {
        return getters.qualifyingScores(id).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    },
    qualifyingAverage: (state, getters) => (id) => {
        if (getters.qualifyingTotalScore(id) && getters.qualifyingScores(id).length) {
            return parseFloat((getters.qualifyingTotalScore(id) / getters.qualifyingScores(id).length).toFixed(2))
        }

        return 0
    },
    topTenTotal: (state, getters) => (id) => {
        return getters.qualifyingScores(id).slice(-10).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    },
    qualifyingScoresToBeat: (state, getters) => (id) => {
        return getters.qualifyingScores(id).slice(-10, -7)
    },
    leaderboard: (state, getters) => {
        let leaderboard = Object.values(state.players)

        leaderboard.forEach((player) => {
            player.totalGames = getters.playerResults(player.id).length
            player.totalQualifyingGames = getters.qualifyingResults(player.id).length
            player.totalQualifyingScore = getters.qualifyingTotalScore(player.id)
            player.qualifyingAverage = getters.qualifyingAverage(player.id)
            player.topTenTotal = getters.topTenTotal(player.id)
            player.scoresToBeat = getters.qualifyingScoresToBeat(player.id)
        })

        leaderboard.sort((a, b) => b.topTenTotal - a.topTenTotal)

        return leaderboard
    }
}
