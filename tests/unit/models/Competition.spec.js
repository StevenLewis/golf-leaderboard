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

        competition.loadResults(results)

        expect(competition.results).toHaveLength(4)
    })

    test('It returns wether the competition has been recorded', () => {
        let competition = new Competition({ id: '1', recorded_at: new Date() })

        expect(competition.isRecorded).toBe(true)
    })

    test('It can order the results by nett and countback', () => {
        let competition = new Competition({ id: '1' })
        let results = new ResultCollection()

        results.add({ id: '1', competitionId: competition.id, score: 36, countback: 2 })
        results.add({ id: '2', competitionId: competition.id, score: 32, countback: 0 })
        results.add({ id: '3', competitionId: competition.id, score: 30, countback: 1 })
        results.add({ id: '4', competitionId: competition.id, score: 36, countback: 0 })
        results.add({ id: '5', competitionId: competition.id, score: 30, countback: 2 })

        competition.loadResults(results)
        competition.sortResults()

        expect(competition.results[0].id).toEqual('1')
        expect(competition.results[1].id).toEqual('4')
        expect(competition.results[2].id).toEqual('2')
        expect(competition.results[3].id).toEqual('5')
        expect(competition.results[4].id).toEqual('3')
    })
})
