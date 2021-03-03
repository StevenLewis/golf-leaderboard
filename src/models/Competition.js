import Model from './Model'

class Competition extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.results === undefined) {
            this.results = []
        }
    }

    withResults (results) {
        this.results = results.where('competitionId', '===', this.id)

        return new this.constructor(this)
    }

    orderResultsByScore () {
        this.results.sortByScore()
    }

    get isRecorded () {
        return !!this.recorded_at
    }
}

export default Competition
