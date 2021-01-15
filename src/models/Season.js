import Model from './Model'

class Season extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.competitions === undefined) {
            this.competitions = []
        }
    }

    withCompetitions (state) {
        this.competitions = state.competitions.where('seasonId', '===', this.id).sortByDesc('date').all()

        return new this.constructor(this)
    }
}

export default Season
