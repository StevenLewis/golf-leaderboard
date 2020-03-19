import api from './firebase'
import * as actions from './action-types'

export default {
    [actions.INITIALISE] ({ commit }) {
        api.players.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                commit('SET_PLAYER', Object.assign({}, change.doc.data(), { id: change.doc.id }))
            })
        })
        api.results.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                commit('SET_RESULT', Object.assign({}, change.doc.data(), { id: change.doc.id }))
            })
        })
        api.competitions.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                commit('SET_COMPETITION', Object.assign({}, change.doc.data(), { id: change.doc.id }))
            })
        })
    },

    [actions.CREATE_PLAYER] ({ getters }, name) {
        api.players.add({
            name
        })
    },
    [actions.RECORD_RESULT] ({ getters }, { player, qualifying, score, date }) {
        api.results.add({
            playerId: player.id,
            qualifying,
            score,
            date
        })
    }
}
