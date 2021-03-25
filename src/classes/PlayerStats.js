import { isQualifying } from '@/getter-helpers'

class PlayerStats {
    constructor (results) {
        if (results === undefined) {
            throw new Error('You must pass in the results')
        }

        this.results = results
    }

    get qualifyingResults () {
        return this.results.filter(isQualifying)
    }

    get qualifyingScores () {
        return this.qualifyingResults.sort((a, b) => a.total - b.total).map(result => result.total)
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
        const scores = [...this.qualifyingScores.slice(-10, -7)]

        while (scores.length < 3) {
            scores.unshift(0)
        }

        return scores
    }

    get bestScore () {
        return Math.max(...this.results.map(result => result.total))
    }

    get totalFees () {
        return this.qualifyingResults.reduce((accumulator, result) => accumulator + result.entryFee, 0)
    }

    get totalWinnings () {
        return this.qualifyingResults.reduce((accumulator, result) => accumulator + result.winnings, 0)
    }

    get totalProfit () {
        return this.totalWinnings - this.totalFees
    }
}

export default PlayerStats
