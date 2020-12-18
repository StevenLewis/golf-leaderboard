import CompetitionCollection from './models/CompetitionCollection'

export default {
    user: {
        loggedIn: false,
        data: null
    },
    players: {},
    results: {},
    competitions: new CompetitionCollection(),
    seasons: {}
}
