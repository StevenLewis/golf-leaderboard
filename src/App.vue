<template>
    <div id="app">
        <template v-if="$route.name === 'home'">
            <router-view />
        </template>
        <template v-else>
            <div class="min-h-screen bg-white">
                <nav class="bg-white border-b border-gray-200">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <navigation />
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
        </template>
    </div>
</template>

<script>
import { INITIALISE } from './action-types'
import { mapGetters } from 'vuex'
import Navigation from './components/Navigation'

export default {
    components: {
        Navigation
    },

    created () {
        this.$store.dispatch(INITIALISE)
    },

    computed: {
        ...mapGetters(['user'])
    }
}
</script>
