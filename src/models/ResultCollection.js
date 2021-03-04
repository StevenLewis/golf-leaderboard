import ModelCollection from './ModelCollection'
import Result from './Result'

class ResultCollection extends ModelCollection {
    loadCompetitions (competitions) {
        let items = this.items.map(result => result.loadCompetition(competitions))

        return new this.constructor(items)
    }

    loadPlayers (players) {
        let items = this.items.map(result => result.loadPlayer(players))

        return new this.constructor(items)
    }
}

ResultCollection.prototype.model = Result

export default ResultCollection
