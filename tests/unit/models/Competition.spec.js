import Competition from '../../../src/models/Competition'
import ResultCollection from '../../../src/models/ResultCollection'

describe('Competition', () => {
    test('It returns the competition results', () => {
        let competition = new Competition({ id: '1' })
        let results = new ResultCollection()

        results.add({ id: '1', competitionId: '1' })
        results.add({ id: '2', competitionId: '1' })
        results.add({ id: '3', competitionId: '1' })
        results.add({ id: '4', competitionId: '1' })
        results.add({ id: '5', competitionId: '2' })

        competition.withResults(results)

        expect(competition.results).toHaveLength(4)
    })
})
