import Model from './Model'
import moment from 'moment'

class Competition extends Model {
    get isRecorded () {
        return !!this.recordedAt
    }

    get isOctober () {
        return moment(this.date.toDate()).month() === 9
    }

    get isNovember () {
        return moment(this.date.toDate()).month() === 10
    }

    get bonusesAvailable () {
        return this.isOctober || this.isNovember || this.isChampionshipDay
    }
}

export default Competition
