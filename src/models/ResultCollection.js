import ModelCollection from './ModelCollection'
import Result from './Result'

class ResultCollection extends ModelCollection {
    withCompetitions (competitions) {
        let items = this.items.map(result => result.withCompetition(competitions))

        return new this.constructor(items)
    }
}

ResultCollection.prototype.model = Result

export default ResultCollection