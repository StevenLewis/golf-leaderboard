import Result from '../../../src/models/Result'

describe('Result', () => {
    test('It return the nett score', () => {
        let result = new Result({ id: '2', score: 30, cuts: 1 })

        expect(result.nett).toEqual(29)
    })

    test('It returns wether the player has entered', () => {
        let player1 = new Result({ id: '1', entryFee: 2.5 })
        let player2 = new Result({ id: '2', entryFee: 0 })

        expect(player1.entered).toEqual(true)
        expect(player2.entered).toEqual(false)
    })
})
