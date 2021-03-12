import Validator from '@/classes/Validator'

class ScoresValidator extends Validator {
    get rules () {
        return [
            {
                criteria: (data) => (data.scores.length < data.results.length),
                message: 'We need all the scores',
                field: 'scores'
            },
            {
                criteria: (data) => (data.scores.some(score => typeof score !== 'number')),
                message: 'The scores must be numbers',
                field: 'scores'
            }
        ]
    }
}

export default ScoresValidator
