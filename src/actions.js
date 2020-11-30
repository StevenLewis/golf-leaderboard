import api from './firebase'
import * as actions from './action-types'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { ENTER_PLAYERS, ENTER_PLAYER } from './action-types'
import { entryFee } from './config/money'

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

    [actions.CREATE_SEASON] ({ getters }, name) {
        api.seasons.add({
            name
        })
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

        api.competitions.doc(id).update({
            recorded_at: date
        })
    },

    [actions.ENTER_PLAYERS] ({ state, dispatch, getters }, { players, competitionId }) {
        if (players.length === 0) return

        players.forEach(player => dispatch(ENTER_PLAYER, {
            playerId: player.id,
            competitionId,
            qualifying: true,
            cuts: getters.playerCuts(player.id),
            entryFee
        }))
    },

    [actions.ENTER_PLAYER] ({ getters }, { playerId, competitionId, qualifying, cuts, entryFee }) {
        api.results.add({
            playerId,
            competitionId,
            qualifying,
            score: 0,
            cuts,
            entryFee,
            winnings: 0,
            countback: 0
        })
    },

    [actions.ENTER_SCORE] ({ getters }, { resultId, score }) {
        api.results.doc(resultId).update({
            score
        })
    },

    [actions.PAY_WINNINGS] ({ getters }, { playerId, resultId, winnings }) {
        const increment = firebase.firestore.FieldValue.increment(winnings)

        api.results.doc(resultId).update({
            winnings
        })

        api.players.doc(playerId).update({
            winnings: increment
        })
    },

    [actions.REMOVE_RESULT] ({ getters }, id) {
        api.results.doc(id).delete()
    },

    [actions.ADD_COUNTBACK] ({ getters }, { resultId, countback }) {
        return api.results.doc(resultId).update({
            countback
        })
    }
}
