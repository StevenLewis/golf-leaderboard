<template>
    <div class="flex justify-between">
        <div class="flex">
            <router-link
                :to="{ name: 'seasons.index' }"
                class="mr-2 md:mr-8 inline-flex items-center px-2 py-2 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out"
                :class="linkClasses('seasons.index')">
                Seasons
            </router-link>
            <router-link
                :to="{ name: 'players.index' }"
                class="mr-2 md:mr-8 inline-flex items-center px-2 py-2 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out"
                :class="linkClasses('players.index')">
                Players
            </router-link>
            <router-link
                v-if="user.loggedIn"
                :to="{ name: 'admin' }"
                class="inline-flex items-center px-2 py-2 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out"
                :class="linkClasses('admin')">
                Admin
            </router-link>
        </div>
        <div class="flex">
            <template v-if="user.loggedIn">
                <div class="hidden md:inline-flex items-center px-2 py-2 text-sm font-medium leading-5">
                    {{ user.data.displayName }}
                </div>
                <a @click.prevent="signOut" class="ml-2 md:ml-8 inline-flex items-center px-2 py-2 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-transparent text-gray-500 cursor-pointer hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300">
                    Sign out
                </a>
            </template>
            <template v-else>
                <router-link :to="{ name: 'login' }" class="ml-8 inline-flex items-center px-2 py-2 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300">
                    Login
                </router-link>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'Navigation',

    computed: {
        ...mapGetters(['user'])
    },

    methods: {
        signOut () {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.replace({ name: 'home' })
                })
        },

        linkClasses (page) {
            return page === this.$route.name ? 'border-indigo-500 focus:border-indigo-700 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'
        }
    }
}
</script>
