import Model from './Model'

class Competition extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.results === undefined) {
            this.results = []
        }
    }

    withResults (results) {
        this.results = results.where('competitionId', '===', this.id).all()

        return new this.constructor(this)
    }
}

export default Competition
