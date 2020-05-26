<template>
    <div id="competitions">
        <header>
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">Competitions</h1>
        </header>
        <div class="mb-10 flex flex-col">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Players</th>
                        </thead>
                        <tbody>
                            <tr v-for="(competition, index) in competitions" :key="competition.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <router-link :to="{ name: 'competitions.show', params: { id: competition.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ competition.date | formatDate }}</router-link>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">24</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="max-w-xs">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Add new competition
            </h3>
            <p class="mb-5 mt-1 text-sm leading-5 text-gray-500">
                Select the date of the competition.
            </p>
            <form @submit.prevent="submit">
                <div>
                    <label for="name" class="sr-only">Date</label>
                    <div class="mt-1 mb-2 relative rounded-md shadow-sm">
                        <datepicker v-model="date" :input-class="datepickerClass" />
                    </div>
                    <p v-if="errors.has('date')" class="my-2 text-sm text-red-600">{{ errors.first('date') }}</p>
                    <button @click.prevent="submit" type="button" class="flex items-center px-3 py-2 ml-auto border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Add Competition
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Errors from '../classes/Errors'
import { mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import { CREATE_COMPETITION } from '../action-types'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    components: {
        Datepicker
    },

    data () {
        return {
            date: new Date(),
            errors: new Errors()
        }
    },

    computed: {
        ...mapGetters(['competitions']),

        datepickerClass () {
            let string = this.errors.has('date') ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 ' : ''

            return string + 'form-input block w-full sm:text-sm sm:leading-5'
        },

        dateIsNotUnique () {
            return this.competitions.some(competition => competition.date.isEqual(firebase.firestore.Timestamp.fromDate(this.date)))
        }
    },

    created () {
        this.date.setHours(0, 0, 0, 0)
    },

    methods: {
        submit () {
            this.errors.clear()

            this.$store.dispatch(CREATE_COMPETITION, this.date)
            this.date = new Date()
            this.date.setHours(0, 0, 0, 0)
            // try {
            // } catch (e) {
            //     console.log(e, 'Catch')
            // }

            // this.validate()
            //     .then(() => {
            //         this.$store.dispatch(CREATE_COMPETITION, this.date)
            //         this.date = new Date()
            //         this.date.setHours(0, 0, 0, 0)
            //     })
            //     .catch(() => {
            //         console.log('Catch')
            //         // Good catch!
            //     })
        },

        async foo () {
            return new Promise(resolve => {
                resolve('Woo')
            })
        }
    }
}
</script>
