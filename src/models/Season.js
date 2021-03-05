import Model from './Model'

class Season extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.competitions === undefined) {
            this.competitions = []
        }
    }

    loadCompetitions (/* CompetitionCollection */ competitions) {
        this.competitions = competitions.where('seasonId', '===', this.id).all()

        return new this.constructor(this)
    }
}

export default Season
