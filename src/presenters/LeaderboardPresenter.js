import PlayerStats from '@/classes/PlayerStats'

class LeaderboardPresenter {
    static present (players, seasonId = null) {
        let leaderboard = players.map(player => {
            return {
                ...player,
                stats: new PlayerStats(player.results)
            }
        })

        leaderboard.sort((a, b) => b.stats.topTenTotal - a.stats.topTenTotal)

        leaderboard = leaderboard.map(player => {
            return {
                id: player.id,
                isGuest: player.isGuest,
                name: player.name,
                totalGames: player.results.length,
                totalQualifyingGames: player.stats.qualifyingResults.length,
                totalQualifyingScore: player.stats.totalQualifyingScore,
                qualifyingAverage: player.stats.qualifyingAverage,
                topTenTotal: player.stats.topTenTotal,
                scoresToBeat: player.stats.scoresToBeat
            }
        })

        return leaderboard
    }
}

export default LeaderboardPresenter
