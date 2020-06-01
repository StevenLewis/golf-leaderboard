import Vue from 'vue'
import Router from 'vue-router'
import Leaderboard from './views/Leaderboard'
import AllPlayers from './views/AllPlayers'
import SinglePlayer from './views/SinglePlayer'
import AllCompetitions from './views/AllCompetitions'
import SingleCompetition from './views/SingleCompetition'
import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/leaderboard',
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
        },
        {
            path: '/competitions',
            name: 'competitions.index',
            component: AllCompetitions
        },
        {
            path: '/competitions/:id',
            name: 'competitions.show',
            component: SingleCompetition
        }
    ]
})
