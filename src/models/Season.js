import Model from './Model'

class Season extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.competitions === undefined) {
            this.competitions = []
        }
    }
}

export default Season
