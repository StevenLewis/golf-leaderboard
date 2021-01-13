import CompetitionCollection from '../../../src/models/CompetitionCollection'

describe('CompetitionCollection', () => {
    test('It can filter by a season', () => {
        let collection = new CompetitionCollection()

        collection.add({ id: '1', seasonId: '1' })
        collection.add({ id: '2', seasonId: '1' })
        collection.add({ id: '3', seasonId: '1' })
        collection.add({ id: '4', seasonId: '2' })

        let actual = collection.filterBySeason('1').all()

        expect(actual).toHaveLength(3)
    })

    test('It should be ordered by most recent', () => {
        let collection = new CompetitionCollection()

        collection.add({ id: '1', seasonId: '1', date: new Date('2020-01-21') })
        collection.add({ id: '2', seasonId: '1', date: new Date('2020-01-01') })
        collection.add({ id: '3', seasonId: '1', date: new Date('2020-01-10') })
        collection.add({ id: '4', seasonId: '2', date: new Date('2020-01-12') })

        let actual = collection.sortByDesc('date').all()

        expect(actual[0].id).toEqual('1')
        expect(actual[1].id).toEqual('4')
        expect(actual[2].id).toEqual('3')
        expect(actual[3].id).toEqual('2')
    })
})
