class LeaderboardPresenter {
    static present (players = []) {
        let leaderboard = players.filter(player => !player.isGuest)

        leaderboard = leaderboard.map((player) => {
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
