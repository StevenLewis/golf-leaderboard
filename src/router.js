import Vue from 'vue'
import Router from 'vue-router'
import Leaderboard from './views/Leaderboard'
import AllPlayers from './views/AllPlayers'
import SinglePlayer from './views/SinglePlayer'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'leaderboard.show',
            component: Leaderboard
        },
        {
            path: '/players',
            name: 'players.index',
            component: AllPlayers
        },
        {
            path: '/players/:id',
            name: 'players.show',
            component: SinglePlayer
        }
    ]
})
