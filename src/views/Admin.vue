<template>
    <section id="admin">
        <header>
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">Admin</h1>
        </header>
        <template v-if="user.loggedIn">
            <Alert ref="alert" />
            <div class="bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Reset cuts
                    </h3>
                    <div class="mt-2 max-w-xl text-sm text-gray-500">
                        <p>
                            Reset the current cuts of all players.
                        </p>
                    </div>
                    <div class="mt-5">
                        <button @click.prevent="resetCuts" type="button" class="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                            Reset cuts
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/Alert'
import { RESET_WINNINGS } from '@/action-types'

export default {
    name: 'Admin',

    components: {
        Alert
    },

    computed: {
        ...mapGetters(['user', 'players'])
    },

    methods: {
        resetCuts () {
            this.$store.dispatch(RESET_WINNINGS, this.players)
                .then(() => this.notify('Succesfully reset cuts'))
                .catch(() => this.notify('Something went wrong', 'danger'))
        },

        notify (message, type = 'success') {
            this.$refs['alert'].show(message, type)
        }
    }
}
</script>
