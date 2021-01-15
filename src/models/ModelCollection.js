import Model from './Model'

class ModelCollection {
    constructor (items = []) {
        this.collect(items)
    }

    collect (items) {
        this.items = items.map((item) => {
            return this.hydrate(item)
        })
    }

    hydrate (item) {
        let Model = this.model

        return new Model(item)
    }

    find (id) {
        return this.items.find(item => item.id === id)
    }

    exists (id) {
        return this.find(id) !== undefined
    }

    add (item) {
        let model = this.hydrate(item)

        if (this.exists(model.id)) {
            throw new Error(`Item with id [${model.id}] already exists`)
        }

        this.items.push(model)
    }

    remove (id) {
        this.items = this.items.filter(item => item.id !== id)
    }

    all () {
        return this.items
    }

    count () {
        return this.items.length
    }

    where (key, operator, value) {
        let comparisonOperator = operator
        let comparisonValue = value

        if (value === undefined) {
            comparisonValue = operator
            comparisonOperator = '==='
        }

        const collection = this.items.filter((item) => {
            switch (comparisonOperator) {
            case '==':
                return item[key] === Number(comparisonValue) ||
                        item[key] === comparisonValue.toString()

            default:
            case '===':
                return item[key] === comparisonValue

            case '!=':
            case '<>':
                return item[key] !== Number(comparisonValue) &&
                        item[key] !== comparisonValue.toString()

            case '!==':
                return item[key] !== comparisonValue

            case '<':
                return item[key] < comparisonValue

            case '<=':
                return item[key] <= comparisonValue

            case '>':
                return item[key] > comparisonValue

            case '>=':
                return item[key] >= comparisonValue
            }
        })

        return new this.constructor(collection)
    }

    sortBy (valueOrFunction) {
        const collection = [].concat(this.items)

        if (typeof valueOrFunction === 'function') {
            collection.sort((a, b) => {
                if (valueOrFunction(a) < valueOrFunction(b)) return -1
                if (valueOrFunction(a) > valueOrFunction(b)) return 1
                return 0
            })
        } else {
            collection.sort((a, b) => {
                if (a[valueOrFunction] < b[valueOrFunction]) return -1
                if (a[valueOrFunction] > b[valueOrFunction]) return 1
                return 0
            })
        }

        return new this.constructor(collection)
    }

    sortByDesc (valueOrFunction) {
        let collection = this.sortBy(valueOrFunction).all().reverse()

        return new this.constructor(collection)
    }

    first (fn) {
        if (typeof fn === 'function') {
            for (let i = 0, length = this.items.length; i < length; i += 1) {
                const item = this.items[i]
                if (fn(item)) {
                    return item
                }
            }
        }

        return this.items[0]
    }
}

ModelCollection.prototype.model = Model

export default ModelCollection
