import getters from '@/getters'
import state from '@/state'

describe('Seasons', () => {
    test('Season competitions', () => {
        state.seasons = {
            '#1': { id: '#1', name: 'Foobar' }
        }
        state.competitions = {
            '#1': { id: '#1', date: new Date('2000-01-01'), seasonId: '#1' },
            '#2': { id: '#2', date: new Date('2000-01-01'), seasonId: '#2' }
        }

        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })('#1')

        expect(seasonCompetitions.length).toEqual(1)
    })

    test('Player results or for a given season', () => {
        state.seasons = {
            '#1': { id: '#1' }
        }
        state.competitions = {
            '#1': { id: '#1', date: new Date('2000-01-01'), seasonId: '#1' },
            '#2': { id: '#2', date: new Date('2000-01-08'), seasonId: '#1' },
            '#3': { id: '#3', date: new Date('2000-01-15'), seasonId: '#1' },
            '#4': { id: '#4', date: new Date('2000-01-22'), seasonId: '#2' }
        }
        state.results = {
            '#1': { id: '#1', playerId: '#1', qualifying: true, score: 25, competitionId: '#1' },
            '#2': { id: '#2', playerId: '#1', qualifying: true, score: 36, competitionId: '#2' },
            '#3': { id: '#3', playerId: '#1', qualifying: true, score: 25, competitionId: '#3' },
            '#4': { id: '#4', playerId: '#1', qualifying: true, score: 30, competitionId: '#4' }
        }

        let competitions = getters.competitions(state)
        let seasonCompetitions = getters.seasonCompetitions(state, { competitions })

        let actual = getters.playerResults(state, { seasonCompetitions })('#1', '#1')

        expect(actual.length).toEqual(3)
    })
})
