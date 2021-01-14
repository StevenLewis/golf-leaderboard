import Result from '../../../src/models/Result'
import CompetitionCollection from '../../../src/models/CompetitionCollection'

describe('Result', () => {
    test('It returns the result competition', () => {
        let competitions = new CompetitionCollection()

        competitions.add({ id: '1' })

        let result = new Result({ id: '34', competitionId: '1' })

        result.withCompetition(competitions)

        expect(result.competition.id).toEqual('1')
    })
})
