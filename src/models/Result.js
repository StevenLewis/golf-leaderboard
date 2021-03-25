import Model from './Model'

class Result extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.cuts === undefined) {
            this.cuts = 0
        }
    }

    get nett () {
        return this.score - this.cuts
    }

    get total () {
        return this.score + (this.bonus || 0)
    }

    get entered () {
        return this.entryFee > 0
    }
}

export default Result
