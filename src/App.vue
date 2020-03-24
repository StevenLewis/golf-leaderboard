<template>
    <div id="app">
        <div class="min-h-screen bg-white">
            <nav class="bg-white border-b border-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <div class="hidden sm:-my-px sm:flex">
                                <router-link
                                    to="/"
                                    class="mr-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out"
                                    :class="linkClasses('leaderboard.show')">
                                    Leaderboard
                                </router-link>
                                <router-link
                                    to="/competitions"
                                    class="mr-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out"
                                    :class="linkClasses('competitions.index')">
                                    Competitions
                                </router-link>
                                <router-link
                                    to="/players"
                                    class="mr-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out"
                                    :class="linkClasses('players.index')">
                                    Players
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="py-10">
                <main>
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <router-view/>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import { INITIALISE } from './action-types'

export default {
    created () {
        this.$store.dispatch(INITIALISE)
    },

    methods: {
        linkClasses (page) {
            return page === this.$route.name ? 'border-indigo-500 focus:border-indigo-700 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'
        }
    }
}
</script>
