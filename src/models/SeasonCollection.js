import ModelCollection from './ModelCollection'
import Season from './Season'

class SeasonCollection extends ModelCollection {
    sortByDate () {
        let items = this.items.sort((a, b) => {
            if (a.createdAt === b.createdAt) {
                return 0
            }

            return (a.createdAt < b.createdAt) ? 1 : -1
        })

        return new this.constructor(items)
    }

    all () {
        return this.sortByDate().items
    }
}

SeasonCollection.prototype.model = Season

export default SeasonCollection
