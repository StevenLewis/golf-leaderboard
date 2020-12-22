import Model from './Model'

class Season extends Model {
    withCompetitions (state) {
        this.competitions = state.competitions.where('seasonId', '===', this.id).all()
    }
}

export default Season
