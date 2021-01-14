import { byPlayer, byResult, byDate, addNettScore, addCompetition, isQualifying } from './getter-helpers'
import LeaderboardPresenter from './presenters/LeaderboardPresenter'

export default {
    user (state) {
        return state.user
    },

    // Players
    players (state) {
        return state.players.withResults(state.results).all()
    },

    members (state, getters) {
        return state.players.where('isGuest', '===', false)
    },

    findPlayer: (state) => (playerId) => {
        return state.players.withResults(state.results).find(playerId)
    },

    // Results
    results (state) {
        return state.results.withCompetitions(state.competitions).all()
    },

    // Competitions
    findCompetition: (state) => (competitionId) => {
        return state.competitions.find(competitionId)
    },

    // Seasons
    seasons (state, getters) {
        return state.seasons.withCompetitions(state).all()
    },

    seasonCompetitions: (state) => (seasonId) => {
        return state.competitions.filterBySeason(seasonId).all()
    },

    findSeason: (state) => (seasonId) => {
        return state.seasons.withCompetitions(state).find(seasonId)
    },

    // Leaderboard
    presentLeaderboard: (state, getters) => (seasonId = null) => {
        let results = state.results.withCompetitions(state)

        return LeaderboardPresenter.present(state.players.withResults(results), seasonId)
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
    }
}
