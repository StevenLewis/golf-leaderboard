class LeaderboardPresenter {
    // TODO: Filter by Season
    static present (players, seasonId = null) {
        let leaderboard = players.where('isGuest', '===', false)

        leaderboard = leaderboard.items.map(player => {
            return {
                id: player.id,
                isGuest: player.isGuest,
                name: player.name,
                totalGames: player.results.length,
                totalQualifyingGames: player.qualifyingResults.length,
                totalQualifyingScore: player.totalQualifyingScore,
                qualifyingAverage: player.qualifyingAverage,
                topTenTotal: player.topTenTotal,
                scoresToBeat: player.scoresToBeat
            }
        })

        leaderboard.sort((a, b) => b.topTenTotal - a.topTenTotal)

        return leaderboard
    }
}

export default LeaderboardPresenter
