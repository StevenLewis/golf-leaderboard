import SingleCompetition from '@/views/SingleCompetition'
import Competition from '@/models/Competition'
import ResultCollection from '@/models/ResultCollection'

describe('SingleCompetition', () => {
    test.skip('It can order the results by nett and countback', () => {
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
