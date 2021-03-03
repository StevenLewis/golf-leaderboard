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
        return state.players.where('isGuest', '===', false).all()
    },

    findPlayer: (state) => (playerId) => {
        return state.players.find(playerId)
    },

    playerResults: (state, getters) => (playerId) => {
        return state.results.where('playerId', '===', playerId).all()
    },

    // Results
    results (state) {
        return state.results.all()
    },

    // Competitions
    competitions (state) {
        return state.competitions.all()
    },

    findCompetition: (state) => (competitionId) => {
        return state.competitions.find(competitionId)
    },

    competitionResults: (state) => (competitionId) => {
        return state.results.where('competitionId', '===', competitionId).all()
    },

    competitionResultCount: (state) => (competitionId) => {
        return state.results.where('competitionId', '===', competitionId).count()
    },

    // Seasons
    seasons (state) {
        return state.seasons.all()
    },

    seasonCompetitions: (state) => (seasonId) => {
        return state.competitions.filterBySeason(seasonId).all()
    },

    seasonCompetitionCount: (state) => (seasonId) => {
        return state.competitions.filterBySeason(seasonId).count()
    },

    findSeason: (state) => (seasonId) => {
        return state.seasons.find(seasonId)
    },

    // Leaderboard
    presentLeaderboard: (state) => (seasonId = null) => {
        const players = state.players.withResults(state.results)

        return LeaderboardPresenter.present(players, seasonId)
    }
}
