import getters from '@/getters'
import state from '@/state'

describe('Leaderboard', () => {
    beforeEach(() => {
        state.players['#1'] = { id: '#1', name: 'Steve', isGuest: false }
        state.players['#2'] = { id: '#2', name: 'Cris', isGuest: false }
        state.players['#3'] = { id: '#3', name: 'Sam', isGuest: false }
        state.players['#4'] = { id: '#4', name: 'Matt', isGuest: false }
        state.players['#5'] = { id: '#5', name: 'Guesty McGuest', isGuest: true }

        state.seasons['#1'] = { id: '#1', name: '2000-01' }
        state.seasons['#2'] = { id: '#2', name: '2001-02' }

        state.competitions['#1'] = { id: '#1', seasonId: '#1', date: new Date('2000-01-01') }
        state.competitions['#2'] = { id: '#2', seasonId: '#1', date: new Date('2010-12-25') }
        state.competitions['#3'] = { id: '#3', seasonId: '#1', date: new Date('2000-01-10') }
        state.competitions['#4'] = { id: '#4', seasonId: '#1', date: new Date('2008-08-12') }
        state.competitions['#5'] = { id: '#5', seasonId: '#1', date: new Date('2015-04-01') }
        state.competitions['#6'] = { id: '#6', seasonId: '#1', date: new Date('2010-10-28') }
        state.competitions['#7'] = { id: '#7', seasonId: '#1', date: new Date('2000-03-01') }
        state.competitions['#8'] = { id: '#8', seasonId: '#1', date: new Date('2015-10-10') }
        state.competitions['#9'] = { id: '#9', seasonId: '#1', date: new Date('2020-01-01') }
        state.competitions['#10'] = { id: '#10', seasonId: '#1', date: new Date('2008-08-20') }
        state.competitions['#11'] = { id: '#11', seasonId: '#2', date: new Date('2001-01-01') }
        state.competitions['#12'] = { id: '#12', seasonId: '#2', date: new Date('2020-11-01') }
        state.competitions['#13'] = { id: '#13', seasonId: '#2', date: new Date('2000-02-01') }
        state.competitions['#14'] = { id: '#14', seasonId: '#2', date: new Date('2000-01-01') }

        state.results['#1'] = { id: '#1', playerId: '#1', qualifying: true, score: 25, competitionId: '#1' }
        state.results['#2'] = { id: '#2', playerId: '#1', qualifying: true, score: 25, competitionId: '#2' }
        state.results['#3'] = { id: '#3', playerId: '#1', qualifying: true, score: 25, competitionId: '#3' }
        state.results['#4'] = { id: '#4', playerId: '#1', qualifying: true, score: 30, competitionId: '#4' }
        state.results['#5'] = { id: '#5', playerId: '#1', qualifying: true, score: 30, competitionId: '#5' }
        state.results['#6'] = { id: '#6', playerId: '#1', qualifying: true, score: 30, competitionId: '#6' }
        state.results['#7'] = { id: '#7', playerId: '#1', qualifying: true, score: 30, competitionId: '#7' }
        state.results['#8'] = { id: '#8', playerId: '#1', qualifying: true, score: 30, competitionId: '#8' }
        state.results['#9'] = { id: '#9', playerId: '#1', qualifying: true, score: 38, competitionId: '#9' }
        state.results['#10'] = { id: '#10', playerId: '#1', qualifying: true, score: 22, competitionId: '#10' }
        state.results['#11'] = { id: '#11', playerId: '#1', qualifying: true, score: 24, competitionId: '#11' }
        state.results['#12'] = { id: '#12', playerId: '#1', qualifying: true, score: 36, competitionId: '#12' }
        state.results['#13'] = { id: '#13', playerId: '#1', qualifying: true, score: 36, competitionId: '#13' }
        state.results['#14'] = { id: '#14', playerId: '#1', qualifying: false, score: 40, competitionId: '#14' }

        state.results['#15'] = { id: '#15', playerId: '#2', qualifying: true, score: 20, competitionId: '#1' }
        state.results['#16'] = { id: '#16', playerId: '#2', qualifying: true, score: 20, competitionId: '#2' }
        state.results['#17'] = { id: '#17', playerId: '#2', qualifying: true, score: 20, competitionId: '#3' }
        state.results['#18'] = { id: '#18', playerId: '#2', qualifying: true, score: 20, competitionId: '#4' }
        state.results['#19'] = { id: '#19', playerId: '#2', qualifying: true, score: 25, competitionId: '#5' }
        state.results['#20'] = { id: '#20', playerId: '#2', qualifying: true, score: 30, competitionId: '#6' }
        state.results['#21'] = { id: '#21', playerId: '#2', qualifying: true, score: 32, competitionId: '#7' }
        state.results['#22'] = { id: '#22', playerId: '#2', qualifying: true, score: 25, competitionId: '#8' }
        state.results['#23'] = { id: '#23', playerId: '#2', qualifying: true, score: 25, competitionId: '#9' }
        state.results['#24'] = { id: '#24', playerId: '#2', qualifying: true, score: 25, competitionId: '#10' }
    })

    test('Qualifying results', () => {
        let playerResults = getters.playerResults(state)
        let actual = getters.qualifyingResults(state, { playerResults })('#1')

        let expected = [
            { id: '#12', playerId: '#1', qualifying: true, score: 36, competitionId: '#12', competition: { id: '#12', seasonId: '#2', date: new Date('2020-11-01') } },
            { id: '#9', playerId: '#1', qualifying: true, score: 38, competitionId: '#9', competition: { id: '#9', seasonId: '#1', date: new Date('2020-01-01') } },
            { id: '#8', playerId: '#1', qualifying: true, score: 30, competitionId: '#8', competition: { id: '#8', seasonId: '#1', date: new Date('2015-10-10') } },
            { id: '#5', playerId: '#1', qualifying: true, score: 30, competitionId: '#5', competition: { id: '#5', seasonId: '#1', date: new Date('2015-04-01') } },
            { id: '#2', playerId: '#1', qualifying: true, score: 25, competitionId: '#2', competition: { id: '#2', seasonId: '#1', date: new Date('2010-12-25') } },
            { id: '#6', playerId: '#1', qualifying: true, score: 30, competitionId: '#6', competition: { id: '#6', seasonId: '#1', date: new Date('2010-10-28') } },
            { id: '#10', playerId: '#1', qualifying: true, score: 22, competitionId: '#10', competition: { id: '#10', seasonId: '#1', date: new Date('2008-08-20') } },
            { id: '#4', playerId: '#1', qualifying: true, score: 30, competitionId: '#4', competition: { id: '#4', seasonId: '#1', date: new Date('2008-08-12') } },
            { id: '#11', playerId: '#1', qualifying: true, score: 24, competitionId: '#11', competition: { id: '#11', seasonId: '#2', date: new Date('2001-01-01') } },
            { id: '#7', playerId: '#1', qualifying: true, score: 30, competitionId: '#7', competition: { id: '#7', seasonId: '#1', date: new Date('2000-03-01') } },
            { id: '#13', playerId: '#1', qualifying: true, score: 36, competitionId: '#13', competition: { id: '#13', seasonId: '#2', date: new Date('2000-02-01') } },
            { id: '#3', playerId: '#1', qualifying: true, score: 25, competitionId: '#3', competition: { id: '#3', seasonId: '#1', date: new Date('2000-01-10') } },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, competitionId: '#1', competition: { id: '#1', seasonId: '#1', date: new Date('2000-01-01') } }
        ]

        expect(actual).toEqual(expected)
    })

    test('Qualifying results for a given season', () => {
        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })
        let playerResults = getters.playerResults(state, { seasonCompetitions })
        let actual = getters.qualifyingResults(state, { playerResults })('#1', '#1')

        let expected = [
            { id: '#9', playerId: '#1', qualifying: true, score: 38, competitionId: '#9', competition: { id: '#9', seasonId: '#1', date: new Date('2020-01-01') } },
            { id: '#8', playerId: '#1', qualifying: true, score: 30, competitionId: '#8', competition: { id: '#8', seasonId: '#1', date: new Date('2015-10-10') } },
            { id: '#5', playerId: '#1', qualifying: true, score: 30, competitionId: '#5', competition: { id: '#5', seasonId: '#1', date: new Date('2015-04-01') } },
            { id: '#2', playerId: '#1', qualifying: true, score: 25, competitionId: '#2', competition: { id: '#2', seasonId: '#1', date: new Date('2010-12-25') } },
            { id: '#6', playerId: '#1', qualifying: true, score: 30, competitionId: '#6', competition: { id: '#6', seasonId: '#1', date: new Date('2010-10-28') } },
            { id: '#10', playerId: '#1', qualifying: true, score: 22, competitionId: '#10', competition: { id: '#10', seasonId: '#1', date: new Date('2008-08-20') } },
            { id: '#4', playerId: '#1', qualifying: true, score: 30, competitionId: '#4', competition: { id: '#4', seasonId: '#1', date: new Date('2008-08-12') } },
            { id: '#7', playerId: '#1', qualifying: true, score: 30, competitionId: '#7', competition: { id: '#7', seasonId: '#1', date: new Date('2000-03-01') } },
            { id: '#3', playerId: '#1', qualifying: true, score: 25, competitionId: '#3', competition: { id: '#3', seasonId: '#1', date: new Date('2000-01-10') } },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, competitionId: '#1', competition: { id: '#1', seasonId: '#1', date: new Date('2000-01-01') } }
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
                scoresToBeat: []
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
            }
        ]

        let players = getters.players(state)
        let members = getters.members(state, { players })
        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let qualifyingTotalScore = getters.qualifyingTotalScore(state, { qualifyingScores })
        let topTenTotal = getters.topTenTotal(state, { qualifyingScores })
        let qualifyingAverage = getters.qualifyingAverage(state, { qualifyingTotalScore, qualifyingScores })
        let qualifyingScoresToBeat = getters.qualifyingScoresToBeat(state, { qualifyingScores })

        let actual = getters.leaderboard(state, { members, playerResults, qualifyingResults, qualifyingScores, qualifyingTotalScore, topTenTotal, qualifyingAverage, qualifyingScoresToBeat })()

        expect(actual).toEqual(expected)
    })

    test('Leaderboard for a given season', () => {
        let expected = [
            {
                id: '#1',
                isGuest: false,
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
                scoresToBeat: []
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
            }
        ]

        let players = getters.players(state)
        let members = getters.members(state, { players })
        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })
        let playerResults = getters.playerResults(state, { seasonCompetitions })
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let qualifyingScores = getters.qualifyingScores(state, { qualifyingResults })
        let qualifyingTotalScore = getters.qualifyingTotalScore(state, { qualifyingScores })
        let topTenTotal = getters.topTenTotal(state, { qualifyingScores })
        let qualifyingAverage = getters.qualifyingAverage(state, { qualifyingTotalScore, qualifyingScores })
        let qualifyingScoresToBeat = getters.qualifyingScoresToBeat(state, { qualifyingScores })

        let actual = getters.leaderboard(state, { members, playerResults, qualifyingResults, qualifyingScores, qualifyingTotalScore, topTenTotal, qualifyingAverage, qualifyingScoresToBeat })('#1')

        expect(actual).toEqual(expected)
    })
})
