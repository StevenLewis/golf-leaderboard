import ResultCollection from '../../../src/models/ResultCollection'
import CompetitionCollection from '../../../src/models/CompetitionCollection'
import PlayerCollection from '../../../src/models/PlayerCollection'

describe('ResultCollection', () => {
    test('It returns the results with the competition', () => {
        let competitions = new CompetitionCollection()
        let results = new ResultCollection()

        competitions.add({ id: '1' })
        competitions.add({ id: '2' })

        results.add({ id: '1', competitionId: '1' })
        results.add({ id: '2', competitionId: '2' })
        results.add({ id: '3', competitionId: '1' })
        results.add({ id: '4', competitionId: '1' })

        const actual = results.withCompetitions(competitions).all()

        expect(actual[0].competition.id).toEqual('1')
        expect(actual[1].competition.id).toEqual('2')
        expect(actual[2].competition.id).toEqual('1')
        expect(actual[3].competition.id).toEqual('1')
    })

    test('It returns the results with the player', () => {
        let players = new PlayerCollection()
        let results = new ResultCollection()

        players.add({ id: '1' })
        players.add({ id: '2' })

        results.add({ id: '1', playerId: '1' })
        results.add({ id: '2', playerId: '2' })
        results.add({ id: '3', playerId: '1' })
        results.add({ id: '4', playerId: '1' })

        const actual = results.withPlayers(players).all()

        expect(actual[0].player.id).toEqual('1')
        expect(actual[1].player.id).toEqual('2')
        expect(actual[2].player.id).toEqual('1')
        expect(actual[3].player.id).toEqual('1')
    })
})
