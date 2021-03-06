<template>
    <div id="seasons">
        <div v-if="user.loggedIn" class="max-w-sm mb-10">
            <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900">
                Add new season
            </h3>
            <form @submit.prevent="submit">
                <div>
                    <label for="name" class="sr-only">Name</label>
                    <div class="flex mt-1 mb-2">
                        <div class="flex-1 w-full relative rounded-md shadow-sm">
                            <input
                                id="name"
                                v-model.trim="name"
                                class="form-input block w-full sm:text-sm sm:leading-5"
                                :class="{ 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300' : errors.has('name') }"
                                placeholder="Season name..."
                                autocomplete="off"
                            />
                        </div>
                        <button @click.prevent="submit" type="button" class="flex-none flex items-center px-3 py-2 ml-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                            New Season
                        </button>
                    </div>
                    <p v-if="errors.has('name')" class="my-2 text-sm text-red-600">{{ errors.first('name') }}</p>
                </div>
            </form>
        </div>
        <header>
            <h1 class="mb-2.5 text-3xl font-bold leading-tight text-gray-900">Seasons</h1>
        </header>
        <div class="flex flex-col mb-10">
            <div class="py-2 overflow-x-auto -mx-2 md:mx-0">
                <div class="align-middle inline-block min-w-full overflow-hidden md:rounded-lg md:shadow md:border md:border-gray-100">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Season</th>
                            <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Competitions</th>
                        </thead>
                        <tbody>
                            <router-link :to="{ name: 'seasons.show', params: { id: season.id } }" v-for="(season, index) in seasons" :key="season.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'" class="table-row">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-indigo-600">
                                    {{ season.name }}
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    {{ seasonCompetitionCount(season.id) }}
                                </td>
                            </router-link>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Errors from '../classes/Errors'
import { CREATE_SEASON } from '@/action-types'

export default {
    name: 'AllSeasons',

    data () {
        return {
            name: '',
            errors: new Errors()
        }
    },

    computed: {
        ...mapGetters(['user', 'seasons', 'seasonCompetitionCount'])
    },

    methods: {
        submit () {
            this.errors.clear()

            this.validate()
                .then(() => {
                    this.$store.dispatch(CREATE_SEASON, this.name)
                    this.name = ''
                })
        },

        // TODO: Move to validator class
        validate () {
            return new Promise((resolve, reject) => {
                let errors = []

                if (this.name.length === 0) {
                    errors.push('We need the season name')
                }

                if (errors.length > 0) {
                    this.errors.record({ name: errors })
                    reject(this.errors)
                }

                resolve('Valid!')
            })
        }
    }
}
</script>
