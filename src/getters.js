import LeaderboardPresenter from './presenters/LeaderboardPresenter'

export default {
    user (state) {
        return state.user
    },

    // Seasons
    seasons ({ seasons }) {
        return seasons.all()
    },

    seasonCompetitions: ({ competitions }) => (seasonId) => {
        return competitions
            .filterBySeason(seasonId)
            .sortByDesc('date')
            .all()
    },

    seasonCompetitionCount: ({ competitions }) => (seasonId) => {
        return competitions
            .filterBySeason(seasonId)
            .count()
    },

    findSeason: ({ seasons }) => (seasonId) => {
        return seasons.find(seasonId)
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

    findPlayer: ({ players }) => (playerId) => {
        return players.find(playerId)
    },

    // Results
    playerResults: ({ results, competitions }) => (playerId) => {
        return results
            .withCompetitions(competitions)
            .where('playerId', '===', playerId)
            .all()
    },

    playerResultsCount: ({ results }) => (playerId) => {
        return results
            .where('playerId', '===', playerId)
            .count()
    },

    // Competitions
    findCompetition: ({ competitions }) => (competitionId) => {
        return competitions.find(competitionId)
    },

    competitionResults: ({ results, players }) => (competitionId) => {
        return results
            .withPlayers(players)
            .where('competitionId', '===', competitionId)
            .all()
    },

    competitionResultCount: ({ results }) => (competitionId) => {
        return results
            .where('competitionId', '===', competitionId)
            .count()
    },

    // Leaderboard
    presentLeaderboard: (state) => (seasonId = null) => {
        const results = state.results.withCompetitions(state.competitions)
        const players = state.players.withResults(results).filterBySeason(seasonId).members().all()

        return LeaderboardPresenter.present(players)
    }
}
