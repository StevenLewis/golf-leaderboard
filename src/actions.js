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

    [actions.FETCH_USER] ({ commit }, user) {
        commit('SET_LOGGED_IN', user !== null)
        if (user) {
            commit('SET_USER', {
                displayName: user.displayName,
                email: user.email
            })
        } else {
            commit('SET_USER', null)
        }
    },

    [actions.CREATE_PLAYER] ({ getters }, name) {
        api.players.add({
            name
        })
    },
    [actions.RECORD_RESULT] ({ getters }, { playerId, qualifying, score, date }) {
        api.results.add({
            playerId,
            qualifying,
            score,
            date
        })
    },
    [actions.CREATE_COMPETITION] ({ getters }, date) {
        api.competitions.add({
            date
        })
    }
}
