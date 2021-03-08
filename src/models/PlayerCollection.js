import ModelCollection from './ModelCollection'
import Player from './Player'
import { byName } from '@/getter-helpers'

class PlayerCollection extends ModelCollection {
    filterBySeason (seasonId = null) {
        let items = seasonId ? [...this.items].map(item => item.filterBySeason(seasonId)) : this.items

        return new this.constructor(items)
    }

    sortByName () {
        let items = this.items.sort(byName)

        return new this.constructor(items)
    }

    withResults (results) {
        let items = this.items

        items.map(item => item.loadResults(results))

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
