import Result from '../../../src/models/Result'
import CompetitionCollection from '../../../src/models/CompetitionCollection'
import PlayerCollection from '../../../src/models/PlayerCollection'

describe('Result', () => {
    test('It returns the result competition', () => {
        let competitions = new CompetitionCollection([{ id: '1' }])
        let result = new Result({ id: '34', competitionId: '1' })

        result.loadCompetition(competitions)

        expect(result.competition.id).toEqual('1')
    })

    test('It returns the result player', () => {
        let players = new PlayerCollection([{ id: '1' }])
        let result = new Result({ id: '34', playerId: '1' })

        result.loadPlayer(players)

        expect(result.player.id).toEqual('1')
    })

    test('It return the nett score', () => {
        let result = new Result({ id: '2', score: 30, cuts: 1 })

        expect(result.nett).toEqual(29)
    })
})
