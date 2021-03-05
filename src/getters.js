import LeaderboardPresenter from './presenters/LeaderboardPresenter'

export default {
    user (state) {
        return state.user
    },

    // Players
    players ({ players, results }) {
        return players.all()
    },

    members ({ players, results }) {
        return players
            .where('isGuest', '===', false)
            .all()
    },

    findPlayer: ({ players, results, competitions }) => (playerId) => {
        return players
            .loadResults(results.loadCompetitions(competitions))
            .find(playerId)
    },

    // Results
    results ({ results, players, competitions }) {
        return results.all()
    },

    // Competitions
    competitions (state) {
        return state.competitions.all()
    },

    findCompetition: (state) => (competitionId) => {
        return state.competitions.find(competitionId)
    },

    competitionResults: (state) => (competitionId) => {
        const results = state.results.loadPlayers(state.players)

        return results.where('competitionId', '===', competitionId).all()
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
        const results = state.results.loadCompetitions(state.competitions)
        const players = state.players.loadResults(results)

        return LeaderboardPresenter.present(players, seasonId)
    }
}
