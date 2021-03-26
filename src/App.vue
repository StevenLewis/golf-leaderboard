<template>
    <div id="app">
        <template v-if="$route.name === 'home'">
            <router-view />
        </template>
        <template v-else>
            <div class="background min-h-screen bg-white">
                <nav class="md:bg-white md:border-b md:border-gray-200">
                    <div class="max-w-7xl mx-auto pt-2 px-2 md:px-6 lg:px-8">
                        <navigation />
                    </div>
                </nav>
                <div class="py-4 md:py-10">
                    <main>
                        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
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

    computed: {
        ...mapGetters(['user'])
    },

    created () {
        this.$store.dispatch(INITIALISE)
    }
}
</script>
