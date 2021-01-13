import Vue from 'vue'

export default {
    SET_LOGGED_IN (state, value) {
        state.user.loggedIn = value
    },
    SET_USER (state, data) {
        state.user.data = data
    },
    'SET_PLAYER' (state, player) {
        state.players.add(player)
    },
    'SET_RESULT' (state, result) {
        state.results.add(result)
    },
    'REMOVE_RESULT' (state, id) {
        Vue.delete(state.results, id)
    },
    'SET_COMPETITION' (state, competition) {
        state.competitions.add(competition)
    },
    'SET_SEASON' (state, season) {
        state.seasons.add(season)
    }
}
