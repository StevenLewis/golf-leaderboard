import Model from './Model'
import { cutPrice } from '@/config/money'

class Player extends Model {
    filterBySeason (seasonId) {
        this.results = [...this.results].filter(result => result.competition.seasonId === seasonId)

        return this
    }

    get cuts () {
        return Math.floor(this.winnings / cutPrice) * 0.5
    }
}

export default Player
