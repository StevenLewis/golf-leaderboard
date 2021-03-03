import Season from '../../../src/models/Season'
import CompetitionCollection from '../../../src/models/CompetitionCollection'
import ResultCollection from '@/models/ResultCollection'

describe('Season', () => {
    test('It returns all of the competitions played in that season', () => {
        let competitions = new CompetitionCollection()
        let results = new ResultCollection()

        competitions.add({ id: '1', seasonId: '1' })
        competitions.add({ id: '2', seasonId: '1' })
        competitions.add({ id: '3', seasonId: '1' })
        competitions.add({ id: '4', seasonId: '2' })

        let season = new Season({ id: '1' })

        season.withCompetitions({ competitions, results })

        expect(season.competitions).toHaveLength(3)
    })
})
