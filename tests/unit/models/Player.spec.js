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

        player.withResults(results)

        expect(player.results).toHaveLength(4)
    })

    test('The results are sort by date', () => {
        let player = new Player({ id: '1' })
        let results = new ResultCollection([
            { id: '1', playerId: '1', competition: { date: new Date('2020-01-01') } },
            { id: '2', playerId: '1', competition: { date: new Date('2020-03-01') } },
            { id: '3', playerId: '1', competition: { date: new Date('2020-02-01') } }
        ])

        player.withResults(results)

        expect(player.results[0].id).toBe('2')
        expect(player.results[1].id).toBe('3')
        expect(player.results[2].id).toBe('1')
    })

    test('It calculates their current cuts', () => {
        let player = new Player({ id: '1', winnings: 26 })

        const actual = player.cuts

        expect(actual).toEqual(1)
    })
})
