import { players, steveResults, crisResults } from '../../mocks/leaderboard'
import LeaderboardPresenter from '../../../src/presenters/LeaderboardPresenter'

describe('LeaderboardPresenter', () => {
    test('It generates a leaderboard', () => {
        players.find('#1').recordResults(steveResults)
        players.find('#2').recordResults(crisResults)

        let leaderboard = LeaderboardPresenter.present(players.items)

        expect(leaderboard).toHaveLength(4)
    })

    test('The presents the correct leaderboard', () => {
        players.find('#1').recordResults(steveResults)
        players.find('#2').recordResults(crisResults)

        let leaderboard = LeaderboardPresenter.present(players.items)

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
                id: '#3',
                isGuest: false,
                name: 'Sam',
                totalGames: 0,
                totalQualifyingGames: 0,
                totalQualifyingScore: 0,
                qualifyingAverage: 0,
                topTenTotal: 0,
                scoresToBeat: []
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
                scoresToBeat: []
            }
        ]

        expect(leaderboard).toEqual(expected)
    })
})
