import ModelCollection from './ModelCollection'
import Player from './Player'
import { byName } from '../getter-helpers'

class PlayerCollection extends ModelCollection {
    sortByName () {
        let items = this.items.sort(byName)

        return new this.constructor(items)
    }

    withResults (results) {
        let items = this.items

        items.forEach(item => item.recordResults(results.where('playerId', '===', item.id).all()))

        return new this.constructor(items)
    }

    all () {
        return this.sortByName().items
    }
}

PlayerCollection.prototype.model = Player

export default PlayerCollection
