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
})
