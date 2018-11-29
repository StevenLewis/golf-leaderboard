import getters from '@/getters'
import state from '@/state'

describe('getters.js', () => {
    beforeEach(() => {
        state.players['#1'] = { id: '#1', name: 'Steve' }
        state.players['#2'] = { id: '#2', name: 'Cris' }
        state.players['#3'] = { id: '#3', name: 'sam' }
        state.players['#4'] = { id: '#4', name: 'Matt' }

        state.results['#1'] = { id: '#1', playerId: '#1', score: 25, date: new Date('2000-01-01') }
        state.results['#2'] = { id: '#2', playerId: '#1', score: 25, date: new Date('2002-12-20') }
        state.results['#3'] = { id: '#3', playerId: '#1', score: 25, date: new Date('2000-02-01') }
        state.results['#4'] = { id: '#4', playerId: '#1', score: 30, date: new Date('2000-09-10') }
        state.results['#5'] = { id: '#5', playerId: '#1', score: 30, date: new Date('2003-02-02') }
        state.results['#6'] = { id: '#6', playerId: '#1', score: 30, date: new Date('2001-02-02') }
        state.results['#7'] = { id: '#7', playerId: '#1', score: 30, date: new Date('2000-03-08') }
        state.results['#8'] = { id: '#8', playerId: '#1', score: 30, date: new Date('2010-02-10') }
        state.results['#9'] = { id: '#9', playerId: '#1', score: 38, date: new Date('2012-02-02') }
        state.results['#10'] = { id: '#10', playerId: '#1', score: 22, date: new Date('2000-10-02') }
        state.results['#11'] = { id: '#11', playerId: '#1', score: 24, date: new Date('2000-04-23') }
        state.results['#12'] = { id: '#12', playerId: '#1', score: 36, date: new Date('2018-02-02') }
        state.results['#13'] = { id: '#13', playerId: '#1', score: 36, date: new Date('2000-02-02') }

        state.results['#14'] = { id: '#14', playerId: '#2', score: 20, date: new Date('2000-02-20') }
        state.results['#15'] = { id: '#15', playerId: '#2', score: 20, date: new Date('2001-03-12') }
        state.results['#16'] = { id: '#16', playerId: '#2', score: 20, date: new Date('2000-02-02') }
        state.results['#17'] = { id: '#17', playerId: '#2', score: 20, date: new Date('2018-06-06') }
        state.results['#18'] = { id: '#18', playerId: '#2', score: 25, date: new Date('2010-02-19') }
        state.results['#19'] = { id: '#19', playerId: '#2', score: 30, date: new Date('2000-08-02') }
        state.results['#20'] = { id: '#20', playerId: '#2', score: 32, date: new Date('2000-10-10') }
        state.results['#21'] = { id: '#21', playerId: '#2', score: 25, date: new Date('2000-02-05') }
        state.results['#22'] = { id: '#22', playerId: '#2', score: 25, date: new Date('2002-10-10') }
        state.results['#23'] = { id: '#23', playerId: '#2', score: 25, date: new Date('2000-11-09') }
    })

    test('All players sorted alphabetically', () => {
        let expected = [
            { id: '#2', name: 'Cris' },
            { id: '#4', name: 'Matt' },
            { id: '#3', name: 'sam' },
            { id: '#1', name: 'Steve' }
        ]

        let actual = getters.players(state)

        expect(actual).toEqual(expected)
    })

    test('All results for a given player in chronological order', () => {
        let expected = [
            state.results['#1'] = { id: '#1', playerId: '#1', score: 25, date: new Date('2000-01-01') },
            state.results['#3'] = { id: '#3', playerId: '#1', score: 25, date: new Date('2000-02-01') },
            state.results['#13'] = { id: '#13', playerId: '#1', score: 36, date: new Date('2000-02-02') },
            state.results['#7'] = { id: '#7', playerId: '#1', score: 30, date: new Date('2000-03-08') },
            state.results['#11'] = { id: '#11', playerId: '#1', score: 24, date: new Date('2000-04-23') },
            state.results['#4'] = { id: '#4', playerId: '#1', score: 30, date: new Date('2000-09-10') },
            state.results['#10'] = { id: '#10', playerId: '#1', score: 22, date: new Date('2000-10-02') },
            state.results['#6'] = { id: '#6', playerId: '#1', score: 30, date: new Date('2001-02-02') },
            state.results['#2'] = { id: '#2', playerId: '#1', score: 25, date: new Date('2002-12-20') },
            state.results['#5'] = { id: '#5', playerId: '#1', score: 30, date: new Date('2003-02-02') },
            state.results['#8'] = { id: '#8', playerId: '#1', score: 30, date: new Date('2010-02-10') },
            state.results['#9'] = { id: '#9', playerId: '#1', score: 38, date: new Date('2012-02-02') },
            state.results['#12'] = { id: '#12', playerId: '#1', score: 36, date: new Date('2018-02-02') }
        ]

        let actual = getters.playerResults(state)('#1')

        expect(actual).toEqual(expected)
    })

    test('Results for non existing player', () => {
        let actual = getters.playerResults(state)('#9999')

        expect(actual).toEqual([])
    })

    test('Results for player with no results', () => {
        let actual = getters.playerResults(state)('#3')

        expect(actual).toEqual([])
    })

    test('Player scores', () => {
        let playerResults = getters.playerResults(state)
        let actual = getters.playerScores(state, { playerResults })('#1')

        expect(actual).toEqual([25, 25, 30, 30, 30, 30, 30, 36, 36, 38])
    })

    test('Player total score', () => {
        let playerResults = getters.playerResults(state)
        let playerScores = getters.playerScores(state, { playerResults })

        let actual = getters.playerTotalScore(state, { playerScores })('#1')

        expect(actual).toEqual(310)
    })

    test('Player average', () => {
        let playerResults = getters.playerResults(state)
        let playerScores = getters.playerScores(state, { playerResults })
        let playerTotalScore = getters.playerTotalScore(state, { playerScores })

        let actual = getters.playerAverage(state, { playerTotalScore })('#1')

        expect(actual).toEqual(31)
    })

    test('Player scores to beat', () => {
        let playerResults = getters.playerResults(state)
        let playerScores = getters.playerScores(state, { playerResults })

        let actual = getters.playerScoresToBeat(state, { playerScores })('#1')

        expect(actual).toEqual([25, 25, 30])
    })

    test('Leaderboard', () => {
        let expected = [
            {
                id: '#1',
                name: 'Steve',
                scores: [25, 25, 30, 30, 30, 30, 30, 36, 36, 38],
                totalScore: 310,
                average: 31,
                scoresToBeat: [25, 25, 30]
            },
            {
                id: '#2',
                name: 'Cris',
                scores: [20, 20, 20, 20, 25, 25, 25, 25, 30, 32],
                totalScore: 242,
                average: 24.2,
                scoresToBeat: [20, 20, 20]
            },
            {
                id: '#3',
                name: 'sam',
                scores: [],
                totalScore: 0,
                average: 0,
                scoresToBeat: []
            },
            {
                id: '#4',
                name: 'Matt',
                scores: [],
                totalScore: 0,
                average: 0,
                scoresToBeat: []
            }
        ]

        let playerResults = getters.playerResults(state)
        let playerScores = getters.playerScores(state, { playerResults })
        let playerTotalScore = getters.playerTotalScore(state, { playerScores })
        let playerAverage = getters.playerAverage(state, { playerTotalScore })
        let playerScoresToBeat = getters.playerScoresToBeat(state, { playerScores })

        let actual = getters.leaderboard(state, { playerResults, playerScores, playerTotalScore, playerAverage, playerScoresToBeat })

        expect(actual).toEqual(expected)
    })
})
