import Model from './Model'
import moment from 'moment'
import { bonusMonths } from '../config/bonuses'

class Competition extends Model {
    get isRecorded () {
        return !!this.recordedAt
    }

    get isFirstBonusMonth () {
        return moment(this.date.toDate()).month() === bonusMonths[0]
    }

    get isSecondBonusMonth () {
        return moment(this.date.toDate()).month() === bonusMonths[1]
    }

    get bonusesAvailable () {
        return this.isFirstBonusMonth || this.isSecondBonusMonth || this.isChampionshipDay
    }
}

export default Competition
