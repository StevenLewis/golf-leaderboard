import getters from '@/getters'
import CompetitionCollection from '@/models/CompetitionCollection'
import SeasonCollection from '@/models/SeasonCollection'
import PlayerCollection from '@/models/PlayerCollection'
import ResultCollection from '@/models/ResultCollection'

describe('Season', () => {
    test('It returns all the seasons', () => {
        const state = { seasons: new SeasonCollection() }

        state.seasons.add({ id: '1' })
        state.seasons.add({ id: '2' })

        const actual = getters.seasons(state)

        expect(actual).toHaveLength(2)
    })

    test('It returns all the competitions for a given season', () => {
        const state = { competitions: new CompetitionCollection() }

        state.competitions.add({ id: '1', seasonId: '1' })
        state.competitions.add({ id: '2', seasonId: '1' })
        state.competitions.add({ id: '3', seasonId: '2' })

        const actual = getters.seasonCompetitions(state)('1')

        expect(actual).toHaveLength(2)
    })

    test('It returns the correct competition count for a given season', () => {
        const state = { competitions: new CompetitionCollection() }

        state.competitions.add({ id: '1', seasonId: '1' })
        state.competitions.add({ id: '2', seasonId: '1' })
        state.competitions.add({ id: '3', seasonId: '2' })

        const actual = getters.seasonCompetitionCount(state)('1')

        expect(actual).toEqual(2)
    })

    test('It returns a season given an ID', () => {
        const state = { seasons: new SeasonCollection() }

        state.seasons.add({ id: '1' })
        state.seasons.add({ id: '2' })

        const actual = getters.findSeason(state)('1')

        expect(actual.id).toEqual('1')
    })
})

describe('Players', () => {
    test('It returns all the player', () => {
        const state = { players: new PlayerCollection() }

        state.players.add({ id: '1', name: 'Steve' })
        state.players.add({ id: '2', name: 'Gary' })
        state.players.add({ id: '3', name: 'Sam' })

        const actual = getters.players(state)

        expect(actual).toHaveLength(3)
    })

    test('It returns only the members', () => {
        const state = { players: new PlayerCollection() }

        state.players.add({ id: '1', name: 'Steve', isGuest: false })
        state.players.add({ id: '2', name: 'Gary', isGuest: false })
        state.players.add({ id: '3', name: 'Sam', isGuest: true })

        const actual = getters.members(state)

        expect(actual).toHaveLength(2)
    })

    test('It returns a player given an ID', () => {
        const state = { players: new PlayerCollection() }

        state.players.add({ id: '1', name: 'Bill' })
        state.players.add({ id: '2', name: 'Bob' })

        const actual = getters.findPlayer(state)('2')

        expect(actual.name).toEqual('Bob')
    })
})

describe('Competitions', () => {
    test('It returns all the competitions', () => {
        const state = { competitions: new CompetitionCollection() }

        state.competitions.add({ id: '1' })
        state.competitions.add({ id: '2' })

        const actual = getters.competitions(state)

        expect(actual).toHaveLength(2)
    })

    test('It returns a competition given an ID', () => {
        const state = { competitions: new CompetitionCollection() }

        state.competitions.add({ id: '1' })
        state.competitions.add({ id: '2' })
        state.competitions.add({ id: '3' })

        const actual = getters.findCompetition(state)('3')

        expect(actual.id).toEqual('3')
    })

    test('It returns the results for a given competition', () => {
        const state = { results: new ResultCollection() }

        state.results.add({ id: '1', competitionId: '1' })
        state.results.add({ id: '2', competitionId: '1' })
        state.results.add({ id: '3', competitionId: '1' })
        state.results.add({ id: '4', competitionId: '2' })

        const actual = getters.competitionResults(state)('1')

        expect(actual).toHaveLength(3)
    })

    test('It returns the result count for a given competition', () => {
        const state = { results: new ResultCollection() }

        state.results.add({ id: '1', competitionId: '1' })
        state.results.add({ id: '2', competitionId: '1' })
        state.results.add({ id: '4', competitionId: '2' })

        const actual = getters.competitionResultCount(state)('1')

        expect(actual).toEqual(2)
    })
})
