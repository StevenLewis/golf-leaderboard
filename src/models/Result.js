import Model from './Model'

class Result extends Model {
    withCompetition (competitions) {
        this.competition = competitions.find(this.competitionId)

        return new this.constructor(this)
    }
}

export default Result
