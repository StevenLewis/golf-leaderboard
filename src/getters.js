import { cutPrice } from './config/money'
import { byPlayer, byResult, byDate, addNettScore, addCompetition, isQualifying } from './getter-helpers'

export default {
    user (state) {
        return state.user
    },
    players (state) {
        return state.players.withResults(state).all()
    },
    members (state, getters) {
        return state.players.where('isGuest', '===', false)
    },
    // LEGACY
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
    findCompetition: (state) => (competitionId) => {
        return state.competitions.find(competitionId)
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
        return state.seasons.withCompetitions(state).all()
    },
    seasonCompetitions: (state) => (seasonId) => {
        return state.competitions.filterBySeason(seasonId).all()
    },
    findSeason: (state) => (seasonId) => {
        return state.seasons.withCompetitions(state).find(seasonId)
    }
}
