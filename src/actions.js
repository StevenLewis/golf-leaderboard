import api from './firebase'
import * as actions from './action-types'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { ENTER_PLAYERS, ENTER_PLAYER } from './action-types'
import { entryFee } from './config/money'

export default {
    [actions.INITIALISE] ({ state, commit }) {
        api.players.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(({ type, doc }) => {
                if (type === 'added') {
                    commit('ADD_PLAYER', { ...doc.data(), id: doc.id })
                } else {
                    commit('UPDATE_PLAYER', { ...doc.data(), id: doc.id })
                }
            })
        })

        api.competitions.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(({ type, doc }) => {
                if (type === 'removed') {
                    commit('REMOVE_COMPETITION', doc.id)
                } else if (type === 'added') {
                    commit('ADD_COMPETITION', { ...doc.data(), id: doc.id })
                } else {
                    commit('UPDATE_COMPETITION', { ...doc.data(), id: doc.id })
                }
            })
        })

        api.results.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(({ type, doc }) => {
                if (type === 'removed') {
                    commit('REMOVE_RESULT', doc.id)
                } else if (type === 'added') {
                    commit('ADD_RESULT', { ...doc.data(), id: doc.id })
                } else {
                    commit('UPDATE_RESULT', { ...doc.data(), id: doc.id })
                }
            })
        })

        api.seasons.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(({ doc }) => {
                commit('ADD_SEASON', { ...doc.data(), id: doc.id })
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

    [actions.CREATE_PLAYER] ({ getters }, { name, isGuest }) {
        api.players.add({
            name,
            isGuest,
            winnings: 0
        })
    },

    [actions.UPDATE_PLAYER] ({ getters }, { playerId, name, isGuest }) {
        return api.players.doc(playerId).update({
            name,
            isGuest
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

    [actions.ENTER_PLAYERS] ({ dispatch }, { players, competitionId }) {
        if (players.length === 0) return

        players.forEach(player => dispatch(ENTER_PLAYER, {
            playerId: player.id,
            competitionId,
            qualifying: true,
            cuts: player.cuts,
            entryFee
        }))
    },

    [actions.ENTER_PLAYER] ({ getters }, { playerId, competitionId, qualifying, cuts, entryFee }) {
        return api.results.add({
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

    [actions.ENTER_SCORE] ({ getters }, { resultId, score, countback = 0 }) {
        return api.results.doc(resultId).update({
            score,
            countback
        })
    },

    [actions.PAY_WINNINGS] ({ getters }, { playerId, resultId, winnings }) {
        const increment = firebase.firestore.FieldValue.increment(winnings)

        api.results.doc(resultId).update({
            winnings
        })

        return api.players.doc(playerId).update({
            winnings: increment
        })
    },

    [actions.REMOVE_RESULT] ({ getters }, id) {
        return api.results.doc(id).delete()
    },

    [actions.REMOVE_COMPETITION] ({ getters }, id) {
        return api.competitions.doc(id).delete()
    },

    [actions.ADD_COUNTBACK] ({ getters }, { resultId, countback }) {
        return api.results.doc(resultId).update({
            countback
        })
    },

    [actions.RESET_WINNINGS] ({ getters }, players) {
        return Promise.all(players.map(player => {
            return api.players.doc(player.id).update({
                winnings: 0
            })
        }))
    }
}
