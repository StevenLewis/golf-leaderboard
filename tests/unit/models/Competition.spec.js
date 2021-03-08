import Competition from '../../../src/models/Competition'

describe('Competition', () => {
    test('It returns wether the competition has been recorded', () => {
        let competition = new Competition({ id: '1', recorded_at: new Date() })

        expect(competition.isRecorded).toBe(true)
    })
})
