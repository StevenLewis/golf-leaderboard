import ModelCollection from './ModelCollection'
import Player from './Player'
import { byName } from '../getter-helpers'

class PlayerCollection extends ModelCollection {
    sortByName () {
        let items = this.items.sort(byName)

        return new this.constructor(items)
    }

    withResults (state) {
        let items = this.items

        items.forEach(item => {
            let results = state.results.where('playerId', '===', item.id).all()
            item.recordResults(results)
        })

        return new this.constructor(items)
    }

    all () {
        return this.sortByName().items
    }
}

PlayerCollection.prototype.model = Player

export default PlayerCollection
