import PlayerStats from '@/classes/PlayerStats'

class LeaderboardPresenter {
    static present ({ players, results }) {
        let leaderboard = players.map(player => {
            const playerResults = results.filter(result => result.playerId === player.id)
            return {
                ...player,
                stats: new PlayerStats(playerResults)
            }
        })

        leaderboard.sort((a, b) => {
            if (b.stats.topTenTotal === a.stats.topTenTotal) {
                return b.stats.qualifyingAverage - a.stats.qualifyingAverage
            }

            return b.stats.topTenTotal - a.stats.topTenTotal
        })

        leaderboard = leaderboard.map(player => {
            return {
                id: player.id,
                isGuest: player.isGuest,
                name: player.name,
                totalGames: player.stats.results.length,
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
