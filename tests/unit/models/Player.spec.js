import Player from '../../../src/models/Player'

describe('Player', () => {
    test('It calculates their current cuts', () => {
        let player = new Player({ id: '1', winnings: 26 })

        const actual = player.cuts

        expect(actual).toEqual(1)
    })
})
