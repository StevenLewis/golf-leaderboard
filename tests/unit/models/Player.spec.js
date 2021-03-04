import Player from '../../../src/models/Player'
import ResultCollection from '@/models/ResultCollection'

describe('Player', () => {
    test('It returns the player results', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1' },
            { id: '2', playerId: '1' },
            { id: '3', playerId: '1' },
            { id: '4', playerId: '1' },
            { id: '5', playerId: '2' }
        ])

        player.loadResults(results)

        expect(player.results).toHaveLength(4)
    })

    test('The results are sort by date', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', competition: { date: new Date('2020-01-01') } },
            { id: '2', playerId: '1', competition: { date: new Date('2020-03-01') } },
            { id: '3', playerId: '1', competition: { date: new Date('2020-02-01') } }
        ])

        player.loadResults(results)

        expect(player.results[0].id).toBe('2')
        expect(player.results[1].id).toBe('3')
        expect(player.results[2].id).toBe('1')
    })

    test('It returns the players qualifying results only', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true },
            { id: '2', playerId: '1', qualifying: false },
            { id: '3', playerId: '1', qualifying: true }
        ])

        player.loadResults(results)

        expect(player.qualifyingResults).toHaveLength(2)
    })

    test('It returns the qualifying results in score order', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, score: 30 },
            { id: '1', playerId: '1', qualifying: true, score: 40 },
            { id: '1', playerId: '1', qualifying: true, score: 28 },
            { id: '1', playerId: '1', qualifying: true, score: 34 }
        ])

        player.loadResults(results)

        expect(player.qualifyingScores).toEqual([28, 30, 34, 40])
    })

    test('Qualifying total score', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, score: 30 },
            { id: '1', playerId: '1', qualifying: true, score: 40 },
            { id: '1', playerId: '1', qualifying: true, score: 28 },
            { id: '1', playerId: '1', qualifying: true, score: 34 }
        ])

        player.loadResults(results)

        expect(player.totalQualifyingScore).toEqual(132)
    })

    test('Top 10 total', () => {
        let player = new Player({ id: '1' })
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
        ])

        player.loadResults(results)

        expect(player.topTenTotal).toEqual(363)
    })

    test('Qualifying average', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, score: 30 },
            { id: '1', playerId: '1', qualifying: true, score: 40 },
            { id: '1', playerId: '1', qualifying: true, score: 28 },
            { id: '1', playerId: '1', qualifying: true, score: 34 },
            { id: '1', playerId: '1', qualifying: true, score: 34 }
        ])

        player.loadResults(results)

        expect(player.qualifyingAverage).toEqual(33.2)
    })

    test('Player scores to beat', () => {
        let player = new Player({ id: '1' })
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
        ])

        player.loadResults(results)

        expect(player.scoresToBeat).toEqual([29, 30, 31])
    })

    test('It can filter the results by a given season', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, score: 40, competition: { date: new Date('2020-01-01'), seasonId: '1' } },
            { id: '2', playerId: '1', qualifying: true, score: 20, competition: { date: new Date('2020-03-01'), seasonId: '1' } },
            { id: '3', playerId: '1', qualifying: true, score: 33, competition: { date: new Date('2020-04-01'), seasonId: '1' } },
            { id: '3', playerId: '1', qualifying: true, score: 30, competition: { date: new Date('2020-02-01'), seasonId: '2' } },
            { id: '3', playerId: '1', qualifying: true, score: 36, competition: { date: new Date('2020-07-01'), seasonId: '2' } }
        ])

        player.loadResults(results)
        player.filterBySeason('1')

        expect(player.results).toHaveLength(3)
        expect(player.totalQualifyingScore).toEqual(93)
        expect(player.qualifyingAverage).toEqual(31)
    })

    test('It return the players best score', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, score: 40 },
            { id: '2', playerId: '1', qualifying: true, score: 20 }
        ])

        player.loadResults(results)

        expect(player.bestScore).toEqual(40)
    })

    test('It returns the players total fees paid', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, entryFee: 3 },
            { id: '2', playerId: '1', qualifying: true, entryFee: 3 }
        ])

        player.loadResults(results)

        expect(player.totalFees).toEqual(6)
    })

    test('It returns the players total winnings', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, winnings: 30 },
            { id: '2', playerId: '1', qualifying: true, winnings: 7.5 }
        ])

        player.loadResults(results)

        expect(player.totalWinnings).toEqual(37.5)
    })

    test('It returns the players total profit', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, entryFee: 3, winnings: 30 },
            { id: '2', playerId: '1', qualifying: true, entryFee: 3, winnings: 7.5 }
        ])

        player.loadResults(results)

        expect(player.totalProfit).toEqual(31.5)
    })

    test('It returns the players current cuts', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', qualifying: true, winnings: 30 },
            { id: '2', playerId: '1', qualifying: true, winnings: 7.5 }
        ])

        player.loadResults(results)

        expect(player.cuts).toEqual(1.5)
    })
})
