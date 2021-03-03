import ModelCollection from './ModelCollection'
import Result from './Result'

class ResultCollection extends ModelCollection {
    withCompetitions (competitions) {
        let items = this.items.map(result => result.withCompetition(competitions))

        return new this.constructor(items)
    }

    withPlayers (players) {
        let items = this.items.map(result => result.withPlayer(players))

        return new this.constructor(items)
    }

    sortByScore () {
        this.items.sort((a, b) => {
            if (a.nett === b.nett) {
                return b.countback - a.countback
            }

            return b.nett - a.nett
        })
    }
}

ResultCollection.prototype.model = Result

export default ResultCollection
