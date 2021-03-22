import Model from './Model'

class Result extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.cuts === undefined) {
            this.cuts = 0
        }
    }

    withCompetition (/* CompetitionCollection */ competitions) {
        this.competition = competitions.find(this.competitionId)

        return new this.constructor(this)
    }

    withPlayer (/* PlayerCollection */ players) {
        this.player = players.find(this.playerId)

        return new this.constructor(this)
    }

    get nett () {
        return this.score - this.cuts
    }

    get entered () {
        return this.entryFee > 0
    }
}

export default Result
