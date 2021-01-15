import SeasonCollection from '../../../src/models/SeasonCollection'
import CompetitionCollection from '../../../src/models/CompetitionCollection'

describe('SeasonCollection', () => {
    test('It can sort the seasons by date', () => {
        let collection = new SeasonCollection()

        collection.add({ id: '1', createdAt: new Date('2000-01-01') })
        collection.add({ id: '2', createdAt: new Date('2010-01-01') })
        collection.add({ id: '3', createdAt: new Date('2020-10-01') })
        collection.add({ id: '4', createdAt: new Date('2000-03-01') })

        let actual = collection.sortByDate()

        expect(actual.items[0].id).toBe('3')
        expect(actual.items[1].id).toBe('2')
        expect(actual.items[2].id).toBe('4')
        expect(actual.items[3].id).toBe('1')
    })

    test('It returns the items in the correct order', () => {
        let collection = new SeasonCollection()

        collection.add({ id: '1', createdAt: new Date('2000-01-01') })
        collection.add({ id: '2', createdAt: new Date('2010-01-01') })

        let actual = collection.all()

        expect(actual).toHaveLength(2)
        expect(actual[0].id).toBe('2')
        expect(actual[1].id).toBe('1')
    })

    test('It returns the seasons with their competitions', () => {
        let competitions = new CompetitionCollection()
        let seasons = new SeasonCollection()

        competitions.add({ id: '1', seasonId: '1' })
        competitions.add({ id: '2', seasonId: '1' })
        competitions.add({ id: '3', seasonId: '1' })
        competitions.add({ id: '4', seasonId: '2' })
        competitions.add({ id: '5', seasonId: '2' })

        seasons.add({ id: '1', createdAt: new Date('2010-01-01') })
        seasons.add({ id: '2', createdAt: new Date('2000-01-01') })

        let actual = seasons.withCompetitions({ competitions }).all()

        expect(actual[0].competitions).toHaveLength(3)
        expect(actual[1].competitions).toHaveLength(2)
    })
})
