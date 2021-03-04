import SeasonCollection from '../../../src/models/SeasonCollection'
import CompetitionCollection from '../../../src/models/CompetitionCollection'

describe('SeasonCollection', () => {
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

        seasons.loadCompetitions(competitions)

        expect(seasons.find('1').competitions).toHaveLength(3)
        expect(seasons.find('2').competitions).toHaveLength(2)
    })
})
