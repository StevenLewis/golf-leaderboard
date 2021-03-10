import PlayerStats from '@/classes/PlayerStats'
import ResultCollection from '@/models/ResultCollection'

describe('PlayerStats', () => {
    test('It returns the players qualifying results only', () => {
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true },
            { id: '2', playerId: '1', qualifying: false },
            { id: '3', playerId: '1', qualifying: true }
        ]).all()

        const actual = new PlayerStats(results)

        expect(actual.qualifyingResults).toHaveLength(2)
    })

    test('It returns the qualifying results in score order', () => {
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, score: 30 },
            { id: '1', playerId: '1', qualifying: true, score: 40 },
            { id: '1', playerId: '1', qualifying: true, score: 28 },
            { id: '1', playerId: '1', qualifying: true, score: 34 }
        ]).all()

        const actual = new PlayerStats(results)

        expect(actual.qualifyingScores).toEqual([28, 30, 34, 40])
    })

    test('Qualifying total score', () => {
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, score: 30 },
            { id: '1', playerId: '1', qualifying: true, score: 40 },
            { id: '1', playerId: '1', qualifying: true, score: 28 },
            { id: '1', playerId: '1', qualifying: true, score: 34 }
        ]).all()

        const actual = new PlayerStats(results)

        expect(actual.totalQualifyingScore).toEqual(132)
    })

    test('Top 10 total', () => {
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, score: 30 },
            { id: '1', playerId: '1', qualifying: true, score: 40 },
            { id: '1', playerId: '1', qualifying: true, score: 28 },
            { id: '1', playerId: '1', qualifying: true, score: 34 },
            { id: '1', playerId: '1', qualifying: true, score: 30 },
            { id: '1', playerId: '1', qualifying: true, score: 40 },
            { id: '1', playerId: '1', qualifying: true, score: 43 },
            { id: '1', playerId: '1', qualifying: true, score: 20 },
            { id: '1', playerId: '1', qualifying: true, score: 23 },
            { id: '1', playerId: '1', qualifying: true, score: 34 },
            { id: '1', playerId: '1', qualifying: true, score: 35 },
            { id: '1', playerId: '1', qualifying: true, score: 39 },
            { id: '1', playerId: '1', qualifying: true, score: 37 },
            { id: '1', playerId: '1', qualifying: true, score: 31 }
        ]).all()

        const actual = new PlayerStats(results)

        expect(actual.topTenTotal).toEqual(363)
    })

    test('Qualifying average', () => {
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, score: 30 },
            { id: '1', playerId: '1', qualifying: true, score: 40 },
            { id: '1', playerId: '1', qualifying: true, score: 28 },
            { id: '1', playerId: '1', qualifying: true, score: 34 },
            { id: '1', playerId: '1', qualifying: true, score: 34 }
        ]).all()

        const actual = new PlayerStats(results)

        expect(actual.qualifyingAverage).toEqual(33.2)
    })

    test('Player scores to beat', () => {
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, score: 30 },
            { id: '1', playerId: '1', qualifying: true, score: 40 },
            { id: '1', playerId: '1', qualifying: true, score: 28 },
            { id: '1', playerId: '1', qualifying: true, score: 36 },
            { id: '1', playerId: '1', qualifying: true, score: 35 },
            { id: '1', playerId: '1', qualifying: true, score: 29 },
            { id: '1', playerId: '1', qualifying: true, score: 31 },
            { id: '1', playerId: '1', qualifying: true, score: 34 },
            { id: '1', playerId: '1', qualifying: true, score: 31 },
            { id: '1', playerId: '1', qualifying: true, score: 43 },
            { id: '1', playerId: '1', qualifying: true, score: 40 }
        ]).all()

        const actual = new PlayerStats(results)

        expect(actual.scoresToBeat).toEqual([29, 30, 31])
    })

    test('It return the players best score', () => {
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, score: 40 },
            { id: '2', playerId: '1', qualifying: true, score: 20 }
        ]).all()

        const actual = new PlayerStats(results)

        expect(actual.bestScore).toEqual(40)
    })

    test('It returns the players total fees paid', () => {
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, entryFee: 3 },
            { id: '2', playerId: '1', qualifying: true, entryFee: 3 }
        ]).all()

        const actual = new PlayerStats(results)

        expect(actual.totalFees).toEqual(6)
    })

    test('It returns the players total winnings', () => {
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, winnings: 30 },
            { id: '2', playerId: '1', qualifying: true, winnings: 7.5 }
        ]).all()

        const actual = new PlayerStats(results)

        expect(actual.totalWinnings).toEqual(37.5)
    })

    test('It returns the players total profit', () => {
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, entryFee: 3, winnings: 30 },
            { id: '2', playerId: '1', qualifying: true, entryFee: 3, winnings: 7.5 }
        ]).all()

        const actual = new PlayerStats(results)

        expect(actual.totalProfit).toEqual(31.5)
    })
})
