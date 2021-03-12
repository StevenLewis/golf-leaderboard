import ScoresValidator from '@/classes/ScoresValidator'

describe('ScoresValidator', () => {
    test('It can validate the number of scores', () => {
        const validator = new ScoresValidator()

        const data = {
            scores: [],
            results: ['a', 'b', 'c']
        }

        validator.validate(data)
            .then(() => {})
            .catch(() => {})

        expect(validator.errors.get('scores')).toHaveLength(1)
        expect(validator.errors.get('scores')).toEqual(['We need all the scores'])
    })

    test('It can validate the type is a number', () => {
        const validator = new ScoresValidator()

        const data = {
            scores: ['foo', 'bar', 'baz'],
            results: ['a', 'b', 'c']
        }

        validator.validate(data)
            .then(() => {})
            .catch(() => {})

        expect(validator.errors.get('scores')).toHaveLength(1)
        expect(validator.errors.get('scores')).toEqual(['The scores must be numbers'])
    })

    test('It can validate all rules', () => {
        const validator = new ScoresValidator()

        const data = {
            scores: ['foo'],
            results: ['a', 'b', 'c']
        }

        validator.validate(data)
            .then(() => {})
            .catch(() => {})

        expect(validator.errors.get('scores')).toHaveLength(2)
        expect(validator.errors.get('scores')).toEqual(['We need all the scores', 'The scores must be numbers'])
    })

    test('It can pass then validation', () => {
        const validator = new ScoresValidator()

        const data = {
            scores: [10, 12, 10],
            results: ['a', 'b', 'c']
        }

        validator.validate(data)
            .then(() => {})
            .catch(() => {})

        expect(validator.errors.get('scores')).toHaveLength(0)
    })
})
