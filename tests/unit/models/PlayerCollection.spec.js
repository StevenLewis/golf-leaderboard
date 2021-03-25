import PlayerCollection from '../../../src/models/PlayerCollection'

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
})
