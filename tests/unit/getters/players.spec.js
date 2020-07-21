import getters from '@/getters'
import state from '@/state'

describe('Players', () => {
    test('All players sorted alphabetically', () => {
        state.players['#1'] = { id: '#1', name: 'Steve' }
        state.players['#2'] = { id: '#2', name: 'Gaz' }
        state.players['#3'] = { id: '#3', name: 'Sav' }
        state.players['#4'] = { id: '#4', name: 'Capo' }

        let expected = [
            { id: '#4', name: 'Capo' },
            { id: '#2', name: 'Gaz' },
            { id: '#3', name: 'Sav' },
            { id: '#1', name: 'Steve' }
        ]

        let actual = getters.players(state)

        expect(actual).toEqual(expected)
    })

    test('All results for a given player in chronological order', () => {
        state.results['#1'] = { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01') }
        state.results['#2'] = { id: '#2', playerId: '#1', qualifying: true, score: 25, date: new Date('2002-12-20') }
        state.results['#3'] = { id: '#3', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-02-01') }
        state.results['#4'] = { id: '#4', playerId: '#1', qualifying: true, score: 30, date: new Date('2000-09-10') }
        state.results['#5'] = { id: '#5', playerId: '#1', qualifying: true, score: 30, date: new Date('2003-02-02') }

        let expected = [
            state.results['#1'] = { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01') },
            state.results['#3'] = { id: '#3', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-02-01') },
            state.results['#4'] = { id: '#4', playerId: '#1', qualifying: true, score: 30, date: new Date('2000-09-10') },
            state.results['#2'] = { id: '#2', playerId: '#1', qualifying: true, score: 25, date: new Date('2002-12-20') },
            state.results['#5'] = { id: '#5', playerId: '#1', qualifying: true, score: 30, date: new Date('2003-02-02') }
        ]

        let actual = getters.playerResults(state)('#1')

        expect(actual).toEqual(expected)
    })

    test('Results for non existing player', () => {
        let actual = getters.playerResults(state)('#9999')

        expect(actual).toEqual([])
    })

    test('Results for player with no results', () => {
        let actual = getters.playerResults(state)('#3')

        expect(actual).toEqual([])
    })
})
