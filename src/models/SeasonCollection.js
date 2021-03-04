import ModelCollection from './ModelCollection'
import Season from './Season'

class SeasonCollection extends ModelCollection {
    loadCompetitions (competitions) {
        let items = this.items

        items.forEach(item => item.loadCompetitions(competitions))

        return new this.constructor(items)
    }
}

SeasonCollection.prototype.model = Season

export default SeasonCollection
