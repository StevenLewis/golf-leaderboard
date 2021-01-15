import CompetitionCollection from './models/CompetitionCollection'
import SeasonCollection from './models/SeasonCollection'
import PlayerCollection from './models/PlayerCollection'
import ResultCollection from './models/ResultCollection'

export default {
    user: {
        loggedIn: false,
        data: null
    },
    players: new PlayerCollection(),
    results: new ResultCollection(),
    competitions: new CompetitionCollection(),
    seasons: new SeasonCollection()
}
