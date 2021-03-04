import Model from './Model'

class Competition extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.results === undefined) {
            this.results = []
        }
    }

    loadResults (/* ResultCollection */ results) {
        this.results = results.where('competitionId', '===', this.id).all()

        return new this.constructor(this)
    }

    sortResults () {
        this.results = [...this.results].sort((a, b) => {
            if (a.nett === b.nett) {
                return b.countback - a.countback
            }

            return b.nett - a.nett
        })
    }

    get isRecorded () {
        return !!this.recorded_at
    }
}

export default Competition
