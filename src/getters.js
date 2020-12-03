import { cutPrice } from './config/money'
import { byPlayer, byResult, byDate, byName, addNettScore, addCompetition, isQualifying } from './getter-helpers'

export default {
    user (state) {
        return state.user
    },
    players (state) {
        return Object.values(state.players)
            .sort(byName)
    },
    playerResults: (state, getters) => (playerId, seasonId = null) => {
        let results = Object.values(state.results)
            .map(addCompetition(state))
            .filter(byPlayer(playerId))
            .sort(byDate)

        if (seasonId) {
            let competitions = getters.seasonCompetitions(seasonId)

            results = results.filter(result => {
                return competitions.some(competition => competition.id === result.competitionId)
            })
        }

        return results
    },
    qualifyingResults: (state, getters) => (playerId, seasonId = null) => {
        return getters.playerResults(playerId, seasonId).filter(isQualifying)
    },
    qualifyingScores: (state, getters) => (playerId, seasonId = null) => {
        return getters.qualifyingResults(playerId, seasonId).sort((a, b) => a.score - b.score).map(player => player.score)
    },
    qualifyingTotalScore: (state, getters) => (playerId, seasonId = null) => {
        return getters.qualifyingScores(playerId, seasonId).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    },
    qualifyingAverage: (state, getters) => (playerId, seasonId = null) => {
        if (getters.qualifyingTotalScore(playerId, seasonId) && getters.qualifyingScores(playerId, seasonId).length) {
            return parseFloat((getters.qualifyingTotalScore(playerId, seasonId) / getters.qualifyingScores(playerId, seasonId).length).toFixed(2))
        }

        return 0
    },
    topTenTotal: (state, getters) => (playerId, seasonId = null) => {
        return getters.qualifyingScores(playerId, seasonId).slice(-10).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    },
    qualifyingScoresToBeat: (state, getters) => (playerId, seasonId = null) => {
        return getters.qualifyingScores(playerId, seasonId).slice(-10, -7)
    },
    leaderboard: (state, getters) => (seasonId = null) => {
        let leaderboard = Object.values(state.players)

        leaderboard.forEach((player) => {
            player.totalGames = getters.playerResults(player.id, seasonId).length
            player.totalQualifyingGames = getters.qualifyingResults(player.id, seasonId).length
            player.totalQualifyingScore = getters.qualifyingTotalScore(player.id, seasonId)
            player.qualifyingAverage = getters.qualifyingAverage(player.id, seasonId)
            player.topTenTotal = getters.topTenTotal(player.id, seasonId)
            player.scoresToBeat = getters.qualifyingScoresToBeat(player.id, seasonId)
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
        let results = Object.values(state.results)
            .map(addNettScore)
            .filter(result => result.competitionId === competitionId)
            .sort(byResult)

        return results.map(result => {
            return {
                ...result,
                player: state.players[result.playerId]
            }
        })
    },
    findCompetition: (state, getters) => (competitionId) => {
        return getters.competitions.find(competition => competition.id === competitionId)
    },
    playerFees: (state, getters) => (playerId) => {
        return getters.qualifyingResults(playerId).reduce((accumulator, result) => accumulator + result.entryFee, 0)
    },
    playerWinnings: (state, getters) => (playerId) => {
        return getters.qualifyingResults(playerId).reduce((accumulator, result) => accumulator + result.winnings, 0)
    },
    playerCuts: (state) => (playerId) => {
        const player = state.players[playerId]

        return Math.floor(player.winnings / cutPrice) * 0.5
    },
    playerProfit: (state, getters) => (playerId) => {
        return getters.playerWinnings(playerId) - getters.playerFees(playerId)
    },
    seasons (state, getters) {
        return Object.values(state.seasons).map(season => {
            return {
                ...season,
                competitions: getters.seasonCompetitions(season.id)
            }
        }).sort((a, b) => {
            if (a.createdAt === b.createdAt) {
                return 0
            }

            return (a.createdAt < b.createdAt) ? 1 : -1
        })
    },
    seasonCompetitions: (state, getters) => (seasonId) => {
        return getters.competitions.filter(competition => competition.seasonId === seasonId)
    }
}
