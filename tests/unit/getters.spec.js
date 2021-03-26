import getters from '@/getters'
import CompetitionCollection from '@/models/CompetitionCollection'
import SeasonCollection from '@/models/SeasonCollection'
import PlayerCollection from '@/models/PlayerCollection'
import ResultCollection from '@/models/ResultCollection'
import firebase from 'firebase/app'
import 'firebase/firestore'

const timestamp = firebase.firestore.Timestamp

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
        const state = {
            players: new PlayerCollection(),
            results: new ResultCollection()
        }

        state.players.add({ id: '1', name: 'Bill' })
        state.players.add({ id: '2', name: 'Bob' })

        const actual = getters.findPlayer(state)('2')

        expect(actual.name).toEqual('Bob')
    })
})

describe('Competitions', () => {
    test('It returns a competition given an ID', () => {
        const state = { competitions: new CompetitionCollection() }

        state.competitions.add({ id: '1' })
        state.competitions.add({ id: '2' })
        state.competitions.add({ id: '3' })

        const actual = getters.findCompetition(state)('3')

        expect(actual.id).toEqual('3')
    })

    test('It returns the results for a given competition', () => {
        const state = {
            results: new ResultCollection(),
            players: new PlayerCollection()
        }

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

    test('It returns all the results for a given season', () => {
        const state = {
            results: new ResultCollection(),
            seasons: new SeasonCollection(),
            competitions: new CompetitionCollection()
        }

        state.results.add({ id: '1', competitionId: '1' })
        state.results.add({ id: '2', competitionId: '1' })
        state.results.add({ id: '3', competitionId: '2' })
        state.results.add({ id: '4', competitionId: '2' })
        state.results.add({ id: '5', competitionId: '2' })

        state.competitions.add({ id: '1', seasonId: '1' })
        state.competitions.add({ id: '2', seasonId: '2' })
        state.competitions.add({ id: '3', seasonId: '3' })

        state.seasons.add({ id: '1' })
        state.seasons.add({ id: '2' })
        state.seasons.add({ id: '3' })

        const resultsA = getters.seasonResults(state)('1')
        const resultsB = getters.seasonResults(state)('2')
        const resultsC = getters.seasonResults(state)('3')

        expect(resultsA).toHaveLength(2)
        expect(resultsB).toHaveLength(3)
        expect(resultsC).toHaveLength(0)
    })
})

describe('Bonuses', () => {
    test('Has player used October bonus for a given season', () => {
        const state = {
            results: new ResultCollection(),
            competitions: new CompetitionCollection(),
            seasons: new SeasonCollection([{ id: '1' }, { id: '2' }])
        }

        state.competitions.add({ id: '1', seasonId: '1' })
        state.competitions.add({ id: '2', seasonId: '2' })

        state.results.add({ id: '1', playerId: '1', competitionId: '1', bonus: 0 })
        state.results.add({ id: '2', playerId: '1', competitionId: '1', bonus: 2 })
        state.results.add({ id: '3', playerId: '2', competitionId: '1', bonus: 0 })
        state.results.add({ id: '4', playerId: '2', competitionId: '1', bonus: 0 })
        state.results.add({ id: '5', playerId: '3', competitionId: '1', bonus: 2 })
        state.results.add({ id: '6', playerId: '3', competitionId: '2', bonus: 2 })

        const seasonResults = getters.seasonResults(state)

        expect(getters.hasUsedOctoberBonus({}, { seasonResults })('1', '1')).toBe(true)
        expect(getters.hasUsedOctoberBonus({}, { seasonResults })('1', '2')).toBe(false)
        expect(getters.hasUsedOctoberBonus({}, { seasonResults })('2', '1')).toBe(false)
        expect(getters.hasUsedOctoberBonus({}, { seasonResults })('2', '2')).toBe(false)
        expect(getters.hasUsedOctoberBonus({}, { seasonResults })('3', '1')).toBe(true)
        expect(getters.hasUsedOctoberBonus({}, { seasonResults })('3', '2')).toBe(true)
    })

    test('Has player used November bonus for a given season', () => {
        const state = {
            results: new ResultCollection(),
            competitions: new CompetitionCollection(),
            seasons: new SeasonCollection([{ id: '1' }, { id: '2' }])
        }

        state.competitions.add({ id: '1', seasonId: '1' })
        state.competitions.add({ id: '2', seasonId: '2' })

        state.results.add({ id: '1', playerId: '1', competitionId: '1', bonus: 0 })
        state.results.add({ id: '2', playerId: '1', competitionId: '1', bonus: 4 })
        state.results.add({ id: '3', playerId: '2', competitionId: '1', bonus: 2 })
        state.results.add({ id: '4', playerId: '2', competitionId: '1', bonus: 0 })
        state.results.add({ id: '5', playerId: '3', competitionId: '1', bonus: 4 })
        state.results.add({ id: '6', playerId: '3', competitionId: '2', bonus: 4 })

        const seasonResults = getters.seasonResults(state)

        expect(getters.hasUsedNovemberBonus({}, { seasonResults })('1', '1')).toBe(true)
        expect(getters.hasUsedNovemberBonus({}, { seasonResults })('1', '2')).toBe(false)
        expect(getters.hasUsedNovemberBonus({}, { seasonResults })('2', '1')).toBe(false)
        expect(getters.hasUsedNovemberBonus({}, { seasonResults })('2', '2')).toBe(false)
        expect(getters.hasUsedNovemberBonus({}, { seasonResults })('3', '1')).toBe(true)
        expect(getters.hasUsedNovemberBonus({}, { seasonResults })('3', '2')).toBe(true)
    })

    test('It returns the correct bonus on championship day', () => {
        const competition = { id: '1', isChampionshipDay: true, seasonId: '1' }
        const actual = getters.playerBonus()('1', competition)

        expect(actual).toEqual(6)
    })

    test('It returns the correct bonus for a player in October', () => {
        const competitions = new CompetitionCollection([
            { id: '1', date: timestamp.fromDate(new Date('2000-10-01')), isChampionshipDay: false, seasonId: '1' }
        ])

        const competition = competitions.find('1')

        const bonus1 = getters.playerBonus({}, { hasUsedOctoberBonus: () => true })('1', competition)
        const bonus2 = getters.playerBonus({}, { hasUsedOctoberBonus: () => false })('2', competition)

        expect(bonus1).toEqual(0)
        expect(bonus2).toEqual(2)
    })

    test('It returns the correct bonus for a player in November', () => {
        const competitions = new CompetitionCollection([
            { id: '1', date: timestamp.fromDate(new Date('2000-11-01')), isChampionshipDay: false, seasonId: '1' }
        ])

        const competition = competitions.find('1')

        const bonus1 = getters.playerBonus({}, { hasUsedNovemberBonus: () => true })('1', competition)
        const bonus2 = getters.playerBonus({}, { hasUsedNovemberBonus: () => false })('2', competition)

        expect(bonus1).toEqual(0)
        expect(bonus2).toEqual(4)
    })
})
