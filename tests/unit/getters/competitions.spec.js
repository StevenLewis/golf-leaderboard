import getters from '@/getters'
import state from '@/state'

describe('Competitions', () => {
    test('Competition results', () => {
        state.competitions = {
            '#1': { id: '#1' }
        }
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#2', playerId: '#2', qualifying: true, score: 25, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#3', playerId: '#3', qualifying: true, score: 25, competitionId: '#2', competition: { date: new Date('2000-01-01') } }
        ]

        let actual = getters.competitionResults(state)('#1')

        expect(actual.length).toEqual(2)
    })

    test('Competition results include nett score', () => {
        state.competitions = {
            '#1': { id: '#1' }
        }
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, cuts: 1, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#2', playerId: '#2', qualifying: true, score: 25, cuts: 2, competitionId: '#1', competition: { date: new Date('2000-01-01') } }
        ]

        let actual = getters.competitionResults(state)('#1')

        expect(actual[0].nett).toEqual(24)
        expect(actual[1].nett).toEqual(23)
    })

    test('Results are ordered by score', () => {
        state.competitions = {
            '#1': { id: '#1' }
        }
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 30, cuts: 0, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#2', playerId: '#2', qualifying: true, score: 31, cuts: 0.5, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#3', playerId: '#3', qualifying: true, score: 34, cuts: 1, competitionId: '#1', competition: { date: new Date('2000-01-01') } }
        ]

        let actual = getters.competitionResults(state)('#1')

        expect(actual[0].id).toEqual('#3')
        expect(actual[1].id).toEqual('#2')
        expect(actual[2].id).toEqual('#1')
    })

    test('Results based on cuts', () => {
        state.competitions = {
            '#1': { id: '#1' }
        }
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, cuts: 0, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#2', playerId: '#2', qualifying: true, score: 31, cuts: 1, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#3', playerId: '#3', qualifying: true, score: 31, cuts: 2, competitionId: '#1', competition: { date: new Date('2000-01-01') } }
        ]

        let actual = getters.competitionResults(state)('#1')

        expect(actual[0].id).toEqual('#2')
        expect(actual[1].id).toEqual('#3')
        expect(actual[2].id).toEqual('#1')
    })

    test('Results based on count back', () => {
        state.competitions = {
            '#1': { id: '#1' }
        }
        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 32, cuts: 2, countback: 0, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#2', playerId: '#2', qualifying: true, score: 31, cuts: 1, countback: 2, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#3', playerId: '#3', qualifying: true, score: 30, cuts: 0, countback: 1, competitionId: '#1', competition: { date: new Date('2000-01-01') } }
        ]

        let actual = getters.competitionResults(state)('#1')

        expect(actual[0].id).toEqual('#1')
        expect(actual[1].id).toEqual('#3')
        expect(actual[2].id).toEqual('#2')
    })
})

describe('Money & Cuts', () => {
    test('Player entry fees', () => {
        state.competitions = {
            '#1': { id: '#1' }
        }

        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, entryFee: 2.5, winnings: 5, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, entryFee: 2.5, winnings: 10, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, entryFee: 2.5, winnings: 0, competitionId: '#1', competition: { date: new Date('2000-01-01') } }
        ]

        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })

        let playerFees = getters.playerFees(state, { qualifyingResults })('#1')

        expect(playerFees).toEqual(7.5)
    })

    test('Player winnings', () => {
        state.competitions = {
            '#1': { id: '#1' }
        }

        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, entryFee: 2.5, winnings: 5, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, entryFee: 2.5, winnings: 20, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, entryFee: 2.5, winnings: 0, competitionId: '#1', competition: { date: new Date('2000-01-01') } }
        ]

        let playerResults = getters.playerResults(state)
        let qualifyingResults = getters.qualifyingResults(state, { playerResults })

        let playerWinnings = getters.playerWinnings(state, { qualifyingResults })('#1')

        expect(playerWinnings).toEqual(25)
    })

    test('Player profit', () => {
        state.competitions = {
            '#1': { id: '#1' }
        }

        state.results = [
            { id: '#1', playerId: '#1', qualifying: true, score: 25, entryFee: 2.5, winnings: 5, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, entryFee: 2.5, winnings: 20, competitionId: '#1', competition: { date: new Date('2000-01-01') } },
            { id: '#1', playerId: '#1', qualifying: true, score: 25, entryFee: 2.5, winnings: 0, competitionId: '#1', competition: { date: new Date('2000-01-01') } }
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
