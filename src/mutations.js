import Vue from 'vue'

export default {
    'SET_PLAYER' (state, player) {
        Vue.set(state.players, player.id, player)
    },
    'SET_RESULT' (state, result) {
        Vue.set(state.results, result.id, result)
    }
}
