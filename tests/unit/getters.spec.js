import getters from '@/getters'
import state from '@/state'

describe('getters.js', () => {
    beforeEach(() => {
        state.players['#1'] = { id: '#1', name: 'Steve' }
        state.players['#2'] = { id: '#2', name: 'Cris' }
        state.players['#3'] = { id: '#3', name: 'sam' }
        state.players['#4'] = { id: '#4', name: 'Matt' }

        state.results['#1'] = { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01') }
        state.results['#2'] = { id: '#2', playerId: '#1', qualifying: true, score: 25, date: new Date('2002-12-20') }
        state.results['#3'] = { id: '#3', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-02-01') }
        state.results['#4'] = { id: '#4', playerId: '#1', qualifying: true, score: 30, date: new Date('2000-09-10') }
        state.results['#5'] = { id: '#5', playerId: '#1', qualifying: true, score: 30, date: new Date('2003-02-02') }
        state.results['#6'] = { id: '#6', playerId: '#1', qualifying: true, score: 30, date: new Date('2001-02-02') }
        state.results['#7'] = { id: '#7', playerId: '#1', qualifying: true, score: 30, date: new Date('2000-03-08') }
        state.results['#8'] = { id: '#8', playerId: '#1', qualifying: true, score: 30, date: new Date('2010-02-10') }
        state.results['#9'] = { id: '#9', playerId: '#1', qualifying: true, score: 38, date: new Date('2012-02-02') }
        state.results['#10'] = { id: '#10', playerId: '#1', qualifying: true, score: 22, date: new Date('2000-10-02') }
        state.results['#11'] = { id: '#11', playerId: '#1', qualifying: true, score: 24, date: new Date('2000-04-23') }
        state.results['#12'] = { id: '#12', playerId: '#1', qualifying: true, score: 36, date: new Date('2018-02-02') }
        state.results['#13'] = { id: '#13', playerId: '#1', qualifying: true, score: 36, date: new Date('2000-02-02') }
        state.results['#14'] = { id: '#14', playerId: '#1', qualifying: false, score: 40, date: new Date('2018-12-02') }

        state.results['#15'] = { id: '#15', playerId: '#2', qualifying: true, score: 20, date: new Date('2000-02-20') }
        state.results['#16'] = { id: '#16', playerId: '#2', qualifying: true, score: 20, date: new Date('2001-03-12') }
        state.results['#17'] = { id: '#17', playerId: '#2', qualifying: true, score: 20, date: new Date('2000-02-02') }
        state.results['#18'] = { id: '#18', playerId: '#2', qualifying: true, score: 20, date: new Date('2018-06-06') }
        state.results['#19'] = { id: '#19', playerId: '#2', qualifying: true, score: 25, date: new Date('2010-02-19') }
        state.results['#20'] = { id: '#20', playerId: '#2', qualifying: true, score: 30, date: new Date('2000-08-02') }
        state.results['#21'] = { id: '#21', playerId: '#2', qualifying: true, score: 32, date: new Date('2000-10-10') }
        state.results['#22'] = { id: '#22', playerId: '#2', qualifying: true, score: 25, date: new Date('2000-02-05') }
        state.results['#23'] = { id: '#23', playerId: '#2', qualifying: true, score: 25, date: new Date('2002-10-10') }
        state.results['#24'] = { id: '#24', playerId: '#2', qualifying: true, score: 25, date: new Date('2000-11-09') }
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
            state.results['#1'] = { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01') },
            state.results['#3'] = { id: '#3', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-02-01') },
            state.results['#13'] = { id: '#13', playerId: '#1', qualifying: true, score: 36, date: new Date('2000-02-02') },
            state.results['#7'] = { id: '#7', playerId: '#1', qualifying: true, score: 30, date: new Date('2000-03-08') },
            state.results['#11'] = { id: '#11', playerId: '#1', qualifying: true, score: 24, date: new Date('2000-04-23') },
            state.results['#4'] = { id: '#4', playerId: '#1', qualifying: true, score: 30, date: new Date('2000-09-10') },
            state.results['#10'] = { id: '#10', playerId: '#1', qualifying: true, score: 22, date: new Date('2000-10-02') },
            state.results['#6'] = { id: '#6', playerId: '#1', qualifying: true, score: 30, date: new Date('2001-02-02') },
            state.results['#2'] = { id: '#2', playerId: '#1', qualifying: true, score: 25, date: new Date('2002-12-20') },
            state.results['#5'] = { id: '#5', playerId: '#1', qualifying: true, score: 30, date: new Date('2003-02-02') },
            state.results['#8'] = { id: '#8', playerId: '#1', qualifying: true, score: 30, date: new Date('2010-02-10') },
            state.results['#9'] = { id: '#9', playerId: '#1', qualifying: true, score: 38, date: new Date('2012-02-02') },
            state.results['#12'] = { id: '#12', playerId: '#1', qualifying: true, score: 36, date: new Date('2018-02-02') },
            state.results['#14'] = { id: '#14', playerId: '#1', qualifying: false, score: 40, date: new Date('2018-12-02') }
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

    test('Qualifying results', () => {
        let playerResults = getters.playerResults(state)
        let actual = getters.qualifyingResults(state, { playerResults })('#1')

        let expected = [
            state.results['#1'] = { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01') },
            state.results['#3'] = { id: '#3', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-02-01') },
            state.results['#13'] = { id: '#13', playerId: '#1', qualifying: true, score: 36, date: new Date('2000-02-02') },
            state.results['#7'] = { id: '#7', playerId: '#1', qualifying: true, score: 30, date: new Date('2000-03-08') },
            state.results['#11'] = { id: '#11', playerId: '#1', qualifying: true, score: 24, date: new Date('2000-04-23') },
            state.results['#4'] = { id: '#4', playerId: '#1', qualifying: true, score: 30, date: new Date('2000-09-10') },
            state.results['#10'] = { id: '#10', playerId: '#1', qualifying: true, score: 22, date: new Date('2000-10-02') },
            state.results['#6'] = { id: '#6', playerId: '#1', qualifying: true, score: 30, date: new Date('2001-02-02') },
            state.results['#2'] = { id: '#2', playerId: '#1', qualifying: true, score: 25, date: new Date('2002-12-20') },
            state.results['#5'] = { id: '#5', playerId: '#1', qualifying: true, score: 30, date: new Date('2003-02-02') },
            state.results['#8'] = { id: '#8', playerId: '#1', qualifying: true, score: 30, date: new Date('2010-02-10') },
            state.results['#9'] = { id: '#9', playerId: '#1', qualifying: true, score: 38, date: new Date('2012-02-02') },
            state.results['#12'] = { id: '#12', playerId: '#1', qualifying: true, score: 36, date: new Date('2018-02-02') }
        ]

        expect(actual).toEqual(expected)
    })

    test('Qualifying scores', () => {
        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let actual = getters.qualifyingScores(state, { qualifyingResults })('#1')

        expect(actual).toEqual([22, 24, 25, 25, 25, 30, 30, 30, 30, 30, 36, 36, 38])
    })

    test('Qualifying total score', () => {
        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let actual = getters.qualifyingTotalScore(state, { qualifyingScores })('#1')

        expect(actual).toEqual(381)
    })

    test('Player top ten total', () => {
        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let actual = getters.topTenTotal(state, { qualifyingScores: qualifyingScores })('#1')

        expect(actual).toEqual(310)
    })

    test('Player average', () => {
        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let qualifyingTotalScore = getters.qualifyingTotalScore(state, { qualifyingScores })
        let actual = getters.qualifyingAverage(state, { qualifyingScores, qualifyingTotalScore })('#1')

        expect(actual).toEqual(29.31)
    })

    test('Player scores to beat', () => {
        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let actual = getters.qualifyingScoresToBeat(state, { qualifyingScores })('#1')

        expect(actual).toEqual([25, 25, 30])
    })

    test('Leaderboard', () => {
        let expected = [
            {
                id: '#1',
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
                name: 'sam',
                totalGames: 0,
                totalQualifyingGames: 0,
                totalQualifyingScore: 0,
                qualifyingAverage: 0,
                topTenTotal: 0,
                scoresToBeat: []
            },
            {
                id: '#4',
                name: 'Matt',
                totalGames: 0,
                totalQualifyingGames: 0,
                totalQualifyingScore: 0,
                qualifyingAverage: 0,
                topTenTotal: 0,
                scoresToBeat: []
            }
        ]

        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let qualifyingTotalScore = getters.qualifyingTotalScore(state, { qualifyingScores })
        let topTenTotal = getters.topTenTotal(state, { qualifyingScores })
        let qualifyingAverage = getters.qualifyingAverage(state, { qualifyingTotalScore, qualifyingScores })
        let qualifyingScoresToBeat = getters.qualifyingScoresToBeat(state, { qualifyingScores })

        let actual = getters.leaderboard(state, { playerResults, qualifyingResults, qualifyingScores, qualifyingTotalScore, topTenTotal, qualifyingAverage, qualifyingScoresToBeat })

        expect(actual).toEqual(expected)
    })

    test('Player entry fees', () => {
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 5 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 10 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 0 }
        ]

        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })

        let playerFees = getters.playerFees(state, { qualifyingResults })('#1')

        expect(playerFees).toEqual(7.5)
    })

    test('Player winnings', () => {
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 5 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 20 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 0 }
        ]

        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })

        let playerWinnings = getters.playerWinnings(state, { qualifyingResults })('#1')

        expect(playerWinnings).toEqual(25)
    })

    test('Player profit', () => {
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 5 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 20 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 0 }
        ]

        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let playerFees = getters.playerFees(state, { qualifyingResults })
        let playerWinnings = getters.playerWinnings(state, { qualifyingResults })

        let playerProfit = getters.playerProfit(state, { playerFees, playerWinnings })('#1')

        expect(playerProfit).toEqual(17.5)
    })

    test('Player cuts', () => {
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 5 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 20 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 0 }
        ]

        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let playerWinnings = getters.playerWinnings(state, { qualifyingResults })

        let playerCuts = getters.playerCuts(state, { playerWinnings })('#1')

        expect(playerCuts).toEqual(1)
    })

    test.only('Season competitions', () => {
        state.seasons = {
            '#1': { id: '#1', name: 'Foobar' }
        }
        state.competitions = {
            '#1': { id: '#1', date: new Date('2000-01-01'), seasonId: '#1' },
            '#2': { id: '#2', date: new Date('2000-01-01'), seasonId: '#2' }
        }

        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })('#1')

        expect(seasonCompetitions.length).toEqual(1)
    })
})
