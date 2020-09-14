import Vue from 'vue'
import Router from 'vue-router'
import AllPlayers from './views/AllPlayers'
import SinglePlayer from './views/SinglePlayer'
import AllCompetitions from './views/AllCompetitions'
import SingleCompetition from './views/SingleCompetition'
import CreateCompetition from './views/CreateCompetition'
import AllSeasons from './views/AllSeasons'
import SingleSeason from './views/SingleSeason'
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
            path: '/seasons',
            name: 'seasons.index',
            component: AllSeasons
        },
        {
            path: '/seasons/:id',
            name: 'seasons.show',
            component: SingleSeason
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
        },
        {
            path: '/seasons/:id/competitions/create',
            name: 'competitions.create',
            component: CreateCompetition
        }
    ]
})
