import LeaderboardPresenter from './presenters/LeaderboardPresenter'
import { bonuses } from './config/bonuses'

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

    hasUsedFirstBonus: (state, getters) => (playerId, seasonId) => {
        const results = getters.seasonResults(seasonId).filter(result => result.playerId === playerId)

        return results.some(result => result.bonus === 2)
    },

    hasUsedSecondBonus: (state, getters) => (playerId, seasonId) => {
        const results = getters.seasonResults(seasonId).filter(result => result.playerId === playerId)

        return results.some(result => result.bonus === 4)
    },

    playerBonus: (state, getters) => (playerId, competition) => {
        if (competition.isChampionshipDay) {
            return bonuses[2]
        }

        if (competition.isFirstBonusMonth) {
            return getters.hasUsedFirstBonus(playerId, competition.seasonId) ? 0 : bonuses[0]
        }

        if (competition.isSecondBonusMonth) {
            return getters.hasUsedSecondBonus(playerId, competition.seasonId) ? 0 : bonuses[1]
        }

        return 0
    },

    // Results
    playerResults: ({ results }) => (playerId) => {
        return results
            .where('playerId', '===', playerId)
            .all()
    },

    playerResultsCount: ({ results }) => (playerId) => {
        return results
            .where('playerId', '===', playerId)
            .count()
    },

    seasonResults: ({ results, competitions }) => (seasonId) => {
        const seasonCompetitionIds = competitions.where('seasonId', '===', seasonId).all().map(competition => competition.id)

        return [...results.items].filter(item => seasonCompetitionIds.includes(item.competitionId))
    },

    // Competitions
    competitions ({ competitions }) {
        return competitions.all()
    },

    findCompetition: ({ competitions }) => (competitionId) => {
        return competitions.find(competitionId)
    },

    competitionResults: ({ results, players }) => (competitionId) => {
        return results
            .where('competitionId', '===', competitionId)
            .all()
    },

    competitionResultCount: ({ results }) => (competitionId) => {
        return results
            .where('competitionId', '===', competitionId)
            .count()
    },

    // Leaderboard
    presentLeaderboard: (state, getters) => (seasonId = null) => {
        const players = state.players.members().all()
        const results = getters.seasonResults(seasonId)

        return LeaderboardPresenter.present({ players, results }, seasonId)
    }
}
