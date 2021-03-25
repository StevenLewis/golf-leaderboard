import ModelCollection from './ModelCollection'
import Result from './Result'

class ResultCollection extends ModelCollection {
    filterBySeason (seasonId) {
        let items = [...this.items].filter(item => item.competitions.seasonId === seasonId)

        return new this.constructor(items)
    }
}

ResultCollection.prototype.model = Result

export default ResultCollection
