import PlayerCollection from '../../../src/models/PlayerCollection'
import ResultCollection from '../../../src/models/ResultCollection'

describe('PlayerCollection', () => {
    test('It can sort the players by name', () => {
        let collection = new PlayerCollection()

        collection.add({ id: '1', name: 'Tiger Woods' })
        collection.add({ id: '2', name: 'Rory McIlroy' })
        collection.add({ id: '3', name: 'Rickie Fowler' })
        collection.add({ id: '4', name: 'Justin Rose' })

        let actual = collection.sortByName()

        expect(actual.items[0].id).toBe('4')
        expect(actual.items[1].id).toBe('3')
        expect(actual.items[2].id).toBe('2')
        expect(actual.items[3].id).toBe('1')
    })

    test('It returns the items in the correct order', () => {
        let collection = new PlayerCollection()

        collection.add({ id: '1', name: 'Tiger Woods' })
        collection.add({ id: '2', name: 'Rory McIlroy' })

        let actual = collection.all()

        expect(actual).toHaveLength(2)
        expect(actual[0].id).toBe('2')
        expect(actual[1].id).toBe('1')
    })

    test('It returns the seasons with their competitions', () => {
        let results = new ResultCollection()
        let players = new PlayerCollection()

        results.add({ id: '1', playerId: '1' })
        results.add({ id: '2', playerId: '1' })
        results.add({ id: '3', playerId: '1' })
        results.add({ id: '4', playerId: '2' })
        results.add({ id: '5', playerId: '2' })

        players.add({ id: '1', name: 'Tiger' })
        players.add({ id: '2', name: 'Rory' })
        players.add({ id: '3', name: 'Steve' })

        players.withResults(results)

        expect(players.find('1').results).toHaveLength(3)
        expect(players.find('2').results).toHaveLength(2)
        expect(players.find('3').results).toHaveLength(0)
    })
})
