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

        items.map(item => item.recordResults(results.where('playerId', '===', item.id).all()))

        return new this.constructor(items)
    }

    all () {
        return this.sortByName().items
    }

    add (item) {
        let model = this.hydrate(item)

        if (this.exists(model.id)) {
            throw new Error(`Item with id [${model.id}] already exists`)
        }

        if (!model.name) {
            throw new Error('This item requires the name attribute')
        }

        this.items.push(model)
    }
}

PlayerCollection.prototype.model = Player

export default PlayerCollection
