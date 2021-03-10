import Model from './Model'
import { byDate } from '@/getter-helpers'
import { cutPrice } from '@/config/money'

class Player extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.results === undefined) {
            this.results = []
        }
    }

    withResults (/* ResultCollection */ results) {
        this.results = results.where('playerId', '===', this.id).all()
        this.results.sort(byDate)

        return new this.constructor(this)
    }

    filterBySeason (seasonId) {
        this.results = [...this.results].filter(result => result.competition.seasonId === seasonId)

        return new this.constructor(this)
    }

    get cuts () {
        return Math.floor(this.winnings / cutPrice) * 0.5
    }
}

export default Player
