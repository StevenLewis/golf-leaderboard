<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Leaderboard</router-link>
            \
            <router-link to="/players">Players</router-link>
            \
            <router-link to="/competitions">Competitions</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
import { INITIALISE } from './action-types'

export default {
    created () {
        this.$store.dispatch(INITIALISE)
    }
}
</script>

<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
