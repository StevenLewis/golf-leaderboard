import Model from './Model'

class Competition extends Model {
    get isRecorded () {
        return !!this.recorded_at
    }
}

export default Competition
