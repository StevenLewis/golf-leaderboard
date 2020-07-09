import Vue from 'vue'

export default {
    SET_LOGGED_IN (state, value) {
        state.user.loggedIn = value
    },
    SET_USER (state, data) {
        state.user.data = data
    },
    'SET_PLAYER' (state, player) {
        Vue.set(state.players, player.id, player)
    },
    'SET_RESULT' (state, result) {
        Vue.set(state.results, result.id, result)
    },
    'REMOVE_RESULT' (state, id) {
        Vue.delete(state.results, id)
    },
    'SET_COMPETITION' (state, competition) {
        Vue.set(state.competitions, competition.id, competition)
    }
}
