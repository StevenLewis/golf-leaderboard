const cutPrice = 12.5

export default {
    user (state) {
        return state.user
    },
    players (state) {
        return Object.values(state.players).sort((a, b) => {
            if (a.name.toLowerCase() === b.name.toLowerCase()) {
                return 0
            }

            return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1
        })
    },
    playerResults: (state) => (playerId) => {
        return Object.values(state.results).filter(result => result.playerId === playerId).sort((a, b) => {
            if (a.date === b.date) {
                return 0
            }

            return (a.date > b.date) ? 1 : -1
        })
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
    },
    competitions (state) {
        return Object.values(state.competitions).sort((a, b) => {
            if (a.date === b.date) {
                return 0
            }

            return (a.date < b.date) ? 1 : -1
        })
    },
    competitionResults: (state) => (competitionId) => {
        let results = Object.values(state.results).filter(result => result.competitionId === competitionId).sort((a, b) => {
            let netA = a.score - a.cuts
            let netB = b.score - b.cuts

            if (netA === netB) {
                return 0
            }

            return (netA < netB) ? 1 : -1
        })

        return results.map(result => {
            return {
                ...result,
                player: state.players[result.playerId]
            }
        })
    },
    playerFees: (state, getters) => (playerId) => {
        return getters.qualifyingResults(playerId).reduce((accumulator, result) => accumulator + result.entryFee, 0)
    },
    playerWinnings: (state, getters) => (playerId) => {
        return getters.qualifyingResults(playerId).reduce((accumulator, result) => accumulator + result.winnings, 0)
    },
    playerProfit: (state, getters) => (playerId) => {
        return getters.playerWinnings(playerId) - getters.playerFees(playerId)
    },
    playerCuts: (state, getters) => (playerId) => {
        return Math.floor(getters.playerWinnings(playerId) / cutPrice) * 0.5
    },
    seasons (state, getters) {
        return Object.values(state.seasons).map(season => {
            return {
                ...season,
                competitions: getters.seasonCompetitions(season.id)
            }
        })
    },
    seasonCompetitions: (state, getters) => (seasonId) => {
        return getters.competitions.filter(competition => competition.seasonId === seasonId)
    },
    playerSeasonResults: (state, getters) => (seasonId, playerId) => {
        let competitions = getters.seasonCompetitions(seasonId)

        return getters.playerResults(playerId).filter(result => {
            return competitions.some(competition => competition.id === result.competitionId)
        })
    }
}
