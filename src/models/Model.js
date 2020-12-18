class Model {
    constructor (attributes = []) {
        if (attributes.id === undefined) {
            throw new Error('Model must have an id')
        }

        this.id = attributes.id

        this.update(attributes)
    }

    update (attributes = []) {
        attributes.id = this.id

        Object.assign(this, attributes)
    }
}

export default Model
