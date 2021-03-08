import Model from './Model'
import { byDate } from '@/getter-helpers'

class Player extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.results === undefined) {
            this.results = []
        }
    }

    loadResults (/* ResultCollection */ results) {
        this.results = results.where('playerId', '===', this.id).all()
        this.results.sort(byDate)

        return new this.constructor(this)
    }

    filterBySeason (seasonId) {
        this.results = [...this.results].filter(result => result.competition.seasonId === seasonId)

        return new this.constructor(this)
    }
}

export default Player
