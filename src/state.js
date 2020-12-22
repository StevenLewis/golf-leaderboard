import CompetitionCollection from './models/CompetitionCollection'
import SeasonCollection from './models/SeasonCollection'

export default {
    user: {
        loggedIn: false,
        data: null
    },
    players: {},
    results: {},
    competitions: new CompetitionCollection(),
    seasons: new SeasonCollection()
}
