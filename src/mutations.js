export default {
    SET_LOGGED_IN (state, value) {
        state.user.loggedIn = value
    },
    SET_USER (state, data) {
        state.user.data = data
    },
    'ADD_PLAYER' (state, player) {
        state.players.add(player)
    },
    'UPDATE_PLAYER' (state, player) {
        state.players.find(player.id).update(player)
    },
    'ADD_RESULT' (state, result) {
        state.results.add(result)
    },
    'UPDATE_RESULT' (state, result) {
        state.results.find(result.id).update(result)
    },
    'REMOVE_RESULT' (state, id) {
        state.results.remove(id)
    },
    'ADD_COMPETITION' (state, competition) {
        state.competitions.add(competition)
    },
    'UPDATE_COMPETITION' (state, competition) {
        state.competitions.find(competition.id).update(competition)
    },
    'REMOVE_COMPETITION' (state, id) {
        state.competitions.remove(id)
    },
    'ADD_SEASON' (state, season) {
        state.seasons.add(season)
    }
}
