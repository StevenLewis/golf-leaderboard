import Model from './Model'
import { cutPrice } from '@/config/money'

class Player extends Model {
    get cuts () {
        return Math.floor(this.winnings / cutPrice) * 0.5
    }
}

export default Player
