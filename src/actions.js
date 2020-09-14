import api from './firebase'
import * as actions from './action-types'
import 'firebase/firestore'
import { ENTER_PLAYERS, ENTER_PLAYER } from './action-types'

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
    [actions.ENTER_PLAYER] ({ getters }, { playerId, competitionId }) {
        api.results.add({
            playerId,
            competitionId
        })
    },
    [actions.ENTER_PLAYERS] ({ dispatch }, { players, competitionId }) {
        if (players.length === 0) return

        players.forEach(player => dispatch(ENTER_PLAYER, {
            playerId: player.id,
            competitionId
        }))
    },
    [actions.CREATE_COMPETITION] ({ dispatch }, { date, seasonId, players = [] }) {
        return new Promise(resolve => {
            api.competitions.add({
                date,
                seasonId,
                recorded_at: null
            }).then(response => {
                dispatch(ENTER_PLAYERS, {
                    players,
                    competitionId: response.id
                })

                resolve(response)
            })
        })
    },
    [actions.RECORD_COMPETITION] ({ getters }, id) {
        let date = new Date()
        date.setHours(0, 0, 0, 0)

        api.competitions.doc(id).set({
            recorded_at: date
        }, { merge: true })
    },
    [actions.RECORD_RESULT] ({ getters }, { playerId, competitionId, qualifying, score, date, cuts, entryFee, winnings = 0 }) {
        api.results.add({
            playerId,
            competitionId,
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
    }
    // [actions.ENTER_PLAYER] ({ getters }, { player, result, winnings }) {
    //     api.players.doc(player).update('winnings', firebase.firestore.FieldValue.increment(winnings))
    //     api.results.doc(result).set({ winnings }, { merge: true })
    // }
}
