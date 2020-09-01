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
                if (change.type === 'removed') {
                    commit('REMOVE_RESULT', change.doc.id)
                } else {
                    commit('SET_RESULT', Object.assign({}, change.doc.data(), { id: change.doc.id }))
                }
            })
        })
        api.competitions.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                commit('SET_COMPETITION', Object.assign({}, change.doc.data(), { id: change.doc.id }))
            })
        })
        api.seasons.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                commit('SET_SEASON', Object.assign({}, change.doc.data(), { id: change.doc.id }))
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
    [actions.RECORD_RESULT] ({ getters }, { playerId, qualifying, score, date, cuts, entryFee, winnings = 0 }) {
        api.results.add({
            playerId,
            qualifying,
            score,
            date,
            cuts,
            entryFee,
            winnings
        })
    },
    [actions.REMOVE_RESULT] ({ getters }, id) {
        api.results.doc(id).delete()
    },
    [actions.CREATE_COMPETITION] ({ getters }, date) {
        api.competitions.add({
            date,
            recorded_at: null
        })
    },
    [actions.RECORD_COMPETITION] ({ getters }, id) {
        let date = new Date()
        date.setHours(0, 0, 0, 0)

        api.competitions.doc(id).set({
            recorded_at: date
        }, { merge: true })
    },
    [actions.ENTER_PLAYER] ({ getters }, { id, entryFee, winnings }) {
        api.results.doc(id).set({
            entryFee,
            winnings
        }, { merge: true })
    }
}
