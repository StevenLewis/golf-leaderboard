import { players, results } from '../../mocks/leaderboard'
import LeaderboardPresenter from '../../../src/presenters/LeaderboardPresenter'

describe('LeaderboardPresenter', () => {
    test('The presents the leaderboard', () => {
        const leaderboard = LeaderboardPresenter.present({
            players: players.all(),
            results: results.all()
        })

        let expected = [
            {
                id: '#1',
                isGuest: false,
                name: 'Steve',
                totalGames: 14,
                totalQualifyingGames: 13,
                totalQualifyingScore: 381,
                qualifyingAverage: 29.31,
                topTenTotal: 310,
                scoresToBeat: [25, 25, 30]
            },
            {
                id: '#2',
                isGuest: false,
                name: 'Cris',
                totalGames: 10,
                totalQualifyingGames: 10,
                totalQualifyingScore: 242,
                qualifyingAverage: 24.2,
                topTenTotal: 242,
                scoresToBeat: [20, 20, 20]
            },
            {
                id: '#4',
                isGuest: false,
                name: 'Matt',
                totalGames: 0,
                totalQualifyingGames: 0,
                totalQualifyingScore: 0,
                qualifyingAverage: 0,
                topTenTotal: 0,
                scoresToBeat: [0, 0, 0]
            },
            {
                id: '#3',
                isGuest: false,
                name: 'Sam',
                totalGames: 0,
                totalQualifyingGames: 0,
                totalQualifyingScore: 0,
                qualifyingAverage: 0,
                topTenTotal: 0,
                scoresToBeat: [0, 0, 0]
            }
        ]

        expect(leaderboard).toEqual(expected)
    })
})
