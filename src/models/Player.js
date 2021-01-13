import Model from './Model'
import { byDate, isQualifying } from '../getter-helpers'

class Player extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.results === undefined) {
            this.results = []
        }
    }

    recordResults (results = []) {
        this.results = results

        this.results.sort(byDate)
    }

    filterBySeason (seasonId) {
        this.results = this.results.filter(result => {
            return result.competition.seasonId === seasonId
        })
    }

    get qualifyingResults () {
        return this.results.filter(isQualifying)
    }

    get qualifyingScores () {
        return this.qualifyingResults.sort((a, b) => a.score - b.score).map(result => result.score)
    }

    get totalQualifyingScore () {
        return this.qualifyingScores.reduce((accumulator, score) => accumulator + score, 0)
    }

    get topTenTotal () {
        return this.qualifyingScores.slice(-10).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }

    get qualifyingAverage () {
        if (this.totalQualifyingScore && this.qualifyingScores.length) {
            return parseFloat((this.totalQualifyingScore / this.qualifyingScores.length).toFixed(2))
        }

        return 0
    }

    get scoresToBeat () {
        return this.qualifyingScores.slice(-10, -7)
    }
}

export default Player
