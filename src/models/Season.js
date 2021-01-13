import Model from './Model'
import LeaderboardPresenter from '../presenters/LeaderboardPresenter'

class Season extends Model {
    constructor (attributes) {
        super(attributes)

        if (this.competitions === undefined) {
            this.competitions = []
        }
    }

    withCompetitions (state) {
        this.competitions = state.competitions.where('seasonId', '===', this.id).sortByDesc('date').all()

        return new this.constructor(this)
    }

    presentLeaderboard (players) {
        // TODO: Filter by this season
        this.leaderboard = LeaderboardPresenter.present(players)
    }
}

export default Season
