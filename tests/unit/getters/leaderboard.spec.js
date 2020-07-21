import getters from '@/getters'
import state from '@/state'

describe('Leaderboard', () => {
    beforeEach(() => {
        state.players['#1'] = { id: '#1', name: 'Steve' }
        state.players['#2'] = { id: '#2', name: 'Cris' }
        state.players['#3'] = { id: '#3', name: 'sam' }
        state.players['#4'] = { id: '#4', name: 'Matt' }

        state.seasons['#1'] = { id: '#1', name: '2000-01' }
        state.seasons['#2'] = { id: '#2', name: '2001-02' }

        state.competitions['#1'] = { id: '#1', seasonId: '#1' }
        state.competitions['#2'] = { id: '#2', seasonId: '#1' }
        state.competitions['#3'] = { id: '#3', seasonId: '#1' }
        state.competitions['#4'] = { id: '#4', seasonId: '#1' }
        state.competitions['#5'] = { id: '#5', seasonId: '#1' }
        state.competitions['#6'] = { id: '#6', seasonId: '#1' }
        state.competitions['#7'] = { id: '#7', seasonId: '#1' }
        state.competitions['#8'] = { id: '#8', seasonId: '#1' }
        state.competitions['#9'] = { id: '#9', seasonId: '#1' }
        state.competitions['#10'] = { id: '#10', seasonId: '#1' }
        state.competitions['#11'] = { id: '#11', seasonId: '#2' }
        state.competitions['#12'] = { id: '#12', seasonId: '#2' }
        state.competitions['#13'] = { id: '#13', seasonId: '#2' }
        state.competitions['#14'] = { id: '#14', seasonId: '#2' }

        state.results['#1'] = { id: '#1', playerId: '#1', qualifying: true, score: 25, competitionId: '#1', date: new Date('2000-01-01') }
        state.results['#2'] = { id: '#2', playerId: '#1', qualifying: true, score: 25, competitionId: '#2', date: new Date('2002-12-20') }
        state.results['#3'] = { id: '#3', playerId: '#1', qualifying: true, score: 25, competitionId: '#3', date: new Date('2000-02-01') }
        state.results['#4'] = { id: '#4', playerId: '#1', qualifying: true, score: 30, competitionId: '#4', date: new Date('2000-09-10') }
        state.results['#5'] = { id: '#5', playerId: '#1', qualifying: true, score: 30, competitionId: '#5', date: new Date('2003-02-02') }
        state.results['#6'] = { id: '#6', playerId: '#1', qualifying: true, score: 30, competitionId: '#6', date: new Date('2001-02-02') }
        state.results['#7'] = { id: '#7', playerId: '#1', qualifying: true, score: 30, competitionId: '#7', date: new Date('2000-03-08') }
        state.results['#8'] = { id: '#8', playerId: '#1', qualifying: true, score: 30, competitionId: '#8', date: new Date('2010-02-10') }
        state.results['#9'] = { id: '#9', playerId: '#1', qualifying: true, score: 38, competitionId: '#9', date: new Date('2012-02-02') }
        state.results['#10'] = { id: '#10', playerId: '#1', qualifying: true, score: 22, competitionId: '#10', date: new Date('2000-10-02') }
        state.results['#11'] = { id: '#11', playerId: '#1', qualifying: true, score: 24, competitionId: '#11', date: new Date('2000-04-23') }
        state.results['#12'] = { id: '#12', playerId: '#1', qualifying: true, score: 36, competitionId: '#12', date: new Date('2018-02-02') }
        state.results['#13'] = { id: '#13', playerId: '#1', qualifying: true, score: 36, competitionId: '#13', date: new Date('2000-02-02') }
        state.results['#14'] = { id: '#14', playerId: '#1', qualifying: false, score: 40, competitionId: '#14', date: new Date('2018-12-02') }

        state.results['#15'] = { id: '#15', playerId: '#2', qualifying: true, score: 20, competitionId: '#1', date: new Date('2000-02-20') }
        state.results['#16'] = { id: '#16', playerId: '#2', qualifying: true, score: 20, competitionId: '#2', date: new Date('2001-03-12') }
        state.results['#17'] = { id: '#17', playerId: '#2', qualifying: true, score: 20, competitionId: '#3', date: new Date('2000-02-02') }
        state.results['#18'] = { id: '#18', playerId: '#2', qualifying: true, score: 20, competitionId: '#4', date: new Date('2018-06-06') }
        state.results['#19'] = { id: '#19', playerId: '#2', qualifying: true, score: 25, competitionId: '#5', date: new Date('2010-02-19') }
        state.results['#20'] = { id: '#20', playerId: '#2', qualifying: true, score: 30, competitionId: '#6', date: new Date('2000-08-02') }
        state.results['#21'] = { id: '#21', playerId: '#2', qualifying: true, score: 32, competitionId: '#7', date: new Date('2000-10-10') }
        state.results['#22'] = { id: '#22', playerId: '#2', qualifying: true, score: 25, competitionId: '#8', date: new Date('2000-02-05') }
        state.results['#23'] = { id: '#23', playerId: '#2', qualifying: true, score: 25, competitionId: '#9', date: new Date('2002-10-10') }
        state.results['#24'] = { id: '#24', playerId: '#2', qualifying: true, score: 25, competitionId: '#10', date: new Date('2000-11-09') }
    })

    test('Qualifying results', () => {
        let playerResults = getters.playerResults(state)
        let actual = getters.qualifyingResults(state, { playerResults })('#1')

        let expected = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, competitionId: '#1', date: new Date('2000-01-01') },
            { id: '#3', playerId: '#1', qualifying: true, score: 25, competitionId: '#3', date: new Date('2000-02-01') },
            { id: '#13', playerId: '#1', qualifying: true, score: 36, competitionId: '#13', date: new Date('2000-02-02') },
            { id: '#7', playerId: '#1', qualifying: true, score: 30, competitionId: '#7', date: new Date('2000-03-08') },
            { id: '#11', playerId: '#1', qualifying: true, score: 24, competitionId: '#11', date: new Date('2000-04-23') },
            { id: '#4', playerId: '#1', qualifying: true, score: 30, competitionId: '#4', date: new Date('2000-09-10') },
            { id: '#10', playerId: '#1', qualifying: true, score: 22, competitionId: '#10', date: new Date('2000-10-02') },
            { id: '#6', playerId: '#1', qualifying: true, score: 30, competitionId: '#6', date: new Date('2001-02-02') },
            { id: '#2', playerId: '#1', qualifying: true, score: 25, competitionId: '#2', date: new Date('2002-12-20') },
            { id: '#5', playerId: '#1', qualifying: true, score: 30, competitionId: '#5', date: new Date('2003-02-02') },
            { id: '#8', playerId: '#1', qualifying: true, score: 30, competitionId: '#8', date: new Date('2010-02-10') },
            { id: '#9', playerId: '#1', qualifying: true, score: 38, competitionId: '#9', date: new Date('2012-02-02') },
            { id: '#12', playerId: '#1', qualifying: true, score: 36, competitionId: '#12', date: new Date('2018-02-02') }
        ]

        expect(actual).toEqual(expected)
    })

    test('Qualifying results for a given season', () => {
        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })
        let playerResults = getters.playerResults(state, { seasonCompetitions })
        let actual = getters.qualifyingResults(state, { playerResults })('#1', '#1')

        let expected = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, competitionId: '#1', date: new Date('2000-01-01') },
            { id: '#3', playerId: '#1', qualifying: true, score: 25, competitionId: '#3', date: new Date('2000-02-01') },
            { id: '#7', playerId: '#1', qualifying: true, score: 30, competitionId: '#7', date: new Date('2000-03-08') },
            { id: '#4', playerId: '#1', qualifying: true, score: 30, competitionId: '#4', date: new Date('2000-09-10') },
            { id: '#10', playerId: '#1', qualifying: true, score: 22, competitionId: '#10', date: new Date('2000-10-02') },
            { id: '#6', playerId: '#1', qualifying: true, score: 30, competitionId: '#6', date: new Date('2001-02-02') },
            { id: '#2', playerId: '#1', qualifying: true, score: 25, competitionId: '#2', date: new Date('2002-12-20') },
            { id: '#5', playerId: '#1', qualifying: true, score: 30, competitionId: '#5', date: new Date('2003-02-02') },
            { id: '#8', playerId: '#1', qualifying: true, score: 30, competitionId: '#8', date: new Date('2010-02-10') },
            { id: '#9', playerId: '#1', qualifying: true, score: 38, competitionId: '#9', date: new Date('2012-02-02') }
        ]

        expect(actual).toEqual(expected)
    })

    test('Qualifying scores', () => {
        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let actual = getters.qualifyingScores(state, { qualifyingResults })('#1')

        expect(actual).toEqual([22, 24, 25, 25, 25, 30, 30, 30, 30, 30, 36, 36, 38])
    })

    test('Qualifying scores for a given season', () => {
        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })
        let playerResults = getters.playerResults(state, { seasonCompetitions })
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let actual = getters.qualifyingScores(state, { qualifyingResults })('#1', '#1')

        expect(actual).toEqual([22, 25, 25, 25, 30, 30, 30, 30, 30, 38])
    })

    test('Qualifying total score', () => {
        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let actual = getters.qualifyingTotalScore(state, { qualifyingScores })('#1')

        expect(actual).toEqual(381)
    })

    test('Qualifying total score for a given season', () => {
        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })
        let playerResults = getters.playerResults(state, { seasonCompetitions })
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let actual = getters.qualifyingTotalScore(state, { qualifyingScores })('#1', '#1')

        expect(actual).toEqual(285)
    })

    test('Player top ten total', () => {
        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let actual = getters.topTenTotal(state, { qualifyingScores: qualifyingScores })('#1')

        expect(actual).toEqual(310)
    })

    test('Player top ten total for a given season', () => {
        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })
        let playerResults = getters.playerResults(state, { seasonCompetitions })
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let actual = getters.topTenTotal(state, { qualifyingScores: qualifyingScores })('#1', '#1')

        expect(actual).toEqual(285)
    })

    test('Player average', () => {
        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let qualifyingTotalScore = getters.qualifyingTotalScore(state, { qualifyingScores })
        let actual = getters.qualifyingAverage(state, { qualifyingScores, qualifyingTotalScore })('#1')

        expect(actual).toEqual(29.31)
    })

    test('Player average for a given season', () => {
        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })
        let playerResults = getters.playerResults(state, { seasonCompetitions })
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let qualifyingTotalScore = getters.qualifyingTotalScore(state, { qualifyingScores })
        let actual = getters.qualifyingAverage(state, { qualifyingScores, qualifyingTotalScore })('#1', '#1')

        expect(actual).toEqual(28.5)
    })

    test('Player scores to beat', () => {
        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let actual = getters.qualifyingScoresToBeat(state, { qualifyingScores })('#1')

        expect(actual).toEqual([25, 25, 30])
    })

    test('Player scores to beat for a given season', () => {
        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })
        let playerResults = getters.playerResults(state, { seasonCompetitions })
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let actual = getters.qualifyingScoresToBeat(state, { qualifyingScores })('#1', '#1')

        expect(actual).toEqual([22, 25, 25])
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

        let actual = getters.leaderboard(state, { playerResults, qualifyingResults, qualifyingScores, qualifyingTotalScore, topTenTotal, qualifyingAverage, qualifyingScoresToBeat })()

        expect(actual).toEqual(expected)
    })

    test('Leaderboard for a given season', () => {
        let expected = [
            {
                id: '#1',
                name: 'Steve',
                totalGames: 10,
                totalQualifyingGames: 10,
                totalQualifyingScore: 285,
                qualifyingAverage: 28.5,
                topTenTotal: 285,
                scoresToBeat: [22, 25, 25]
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

        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })
        let playerResults = getters.playerResults(state, { seasonCompetitions })
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let qualifyingTotalScore = getters.qualifyingTotalScore(state, { qualifyingScores })
        let topTenTotal = getters.topTenTotal(state, { qualifyingScores })
        let qualifyingAverage = getters.qualifyingAverage(state, { qualifyingTotalScore, qualifyingScores })
        let qualifyingScoresToBeat = getters.qualifyingScoresToBeat(state, { qualifyingScores })

        let actual = getters.leaderboard(state, { playerResults, qualifyingResults, qualifyingScores, qualifyingTotalScore, topTenTotal, qualifyingAverage, qualifyingScoresToBeat })('#1')

        expect(actual).toEqual(expected)
    })
})
