import getters from '@/getters'
import state from '@/state'

describe('Competitions', () => {
    test('Competition results', () => {
        state.competitions = {
            '#1': { id: '#1' }
        }
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, competitionId: '#1' },
            { id: '#2', playerId: '#1', qualifying: true, score: 25, competitionId: '#1' },
            { id: '#3', playerId: '#1', qualifying: true, score: 25, competitionId: '#2' }
        ]

        let actual = getters.competitionResults(state)('#1')

        expect(actual.length).toEqual(2)
    })
})

describe('Money & Cuts', () => {
    test('Player entry fees', () => {
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 5 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 10 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 0 }
        ]

        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })

        let playerFees = getters.playerFees(state, { qualifyingResults })('#1')

        expect(playerFees).toEqual(7.5)
    })

    test('Player winnings', () => {
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 5 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 20 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 0 }
        ]

        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })

        let playerWinnings = getters.playerWinnings(state, { qualifyingResults })('#1')

        expect(playerWinnings).toEqual(25)
    })

    test('Player profit', () => {
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 5 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 20 },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, date: new Date('2000-01-01'), entryFee: 2.5, winnings: 0 }
        ]

        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })
        let playerFees = getters.playerFees(state, { qualifyingResults })
        let playerWinnings = getters.playerWinnings(state, { qualifyingResults })

        let playerProfit = getters.playerProfit(state, { playerFees, playerWinnings })('#1')

        expect(playerProfit).toEqual(17.5)
    })

    test('Player cuts', () => {
        state.players = {
            '#1': {
                id: '#1',
                winnings: 25
            }
        }

        let playerCuts = getters.playerCuts(state)('#1')

        expect(playerCuts).toEqual(1)
    })
})
