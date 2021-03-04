import ModelCollection from './ModelCollection'
import Competition from './Competition'

class CompetitionCollection extends ModelCollection {
    filterBySeason (seasonId) {
        let items = this.items.filter(competition => competition.seasonId === seasonId)

        return new this.constructor(items)
    }

    loadResults (results) {
        let items = this.items

        items.forEach(item => item.loadResults(results))

        return new this.constructor(items)
    }
}

CompetitionCollection.prototype.model = Competition

export default CompetitionCollection
