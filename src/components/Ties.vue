<template>
    <div v-if="isVisible" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75" />
            </div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                            Resolves Ties
                        </h3>
                        <p class="text-sm text-gray-500">
                            You need to resolve the ties below in the money places, based on countback. Use the arrows to put the players into the correct order.
                        </p>
                    </div>
                </div>
                <div class="mt-5">
                    <div v-for="(tie, index) in tiesToResolve" :key="index" class="mb-5">
                        <table class="min-w-full">
                            <thead>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Player</th>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Cuts</th>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nett</th>
                            </thead>
                            <tbody>
                                <tr v-for="(result, index) in tie" :key="result.id">
                                    <td class="px-4 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                        <div class="flex flex-col items-center">
                                            <div @click="moveUp(tie, index)" class="p-1 rounded-full cursor-pointer hover:bg-indigo-100">
                                                <svg hight="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div @click="moveDown(tie, index)" class="p-1 rounded-full cursor-pointer hover:bg-indigo-100">
                                                <svg hight="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ index + 1 }}</td>
                                    <td class="px-4 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                        <router-link :to="{ name: 'players.show', params: { id: result.player.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ result.player.name }}</router-link>
                                    </td>
                                    <td class="px-4 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.score }}</td>
                                    <td class="px-4 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.cuts }}</td>
                                    <td class="px-4 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.nett }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button @click.prevent="confirm" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                        Confirm
                    </button>
                    <button @click.prevent="hide" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ADD_COUNTBACK } from '../action-types'

export default {
    name: 'Ties',

    props: {
        ties: {
            type: Array,
            required: true
        }
    },

    data () {
        return {
            isVisible: false
        }
    },

    computed: {
        tiesToResolve () {
            return this.ties.filter(tie => tie.length > 1)
        }
    },

    methods: {
        show () {
            this.isVisible = true
        },

        hide () {
            this.isVisible = false
        },

        moveUp (tie, index) {
            const isFirst = index === 0
            const result = tie.splice(index, 1)

            if (isFirst) {
                return tie.push(result[0])
            }

            tie.splice(index - 1, 0, result[0])
        },

        moveDown (tie, index) {
            const isLast = index === (tie.length - 1)
            const result = tie.splice(index, 1)

            if (isLast) {
                return tie.unshift(result[0])
            }

            tie.splice(index + 1, 0, result[0])
        },

        async confirm () {
            await Promise.all(this.tiesToResolve.map(async (tie) => {
                await this.addCountbacks(tie)
            }))

            this.$emit('resolved')
            this.hide()
        },

        async addCountbacks (tie) {
            await Promise.all(tie.map(async (result, index) => {
                await this.$store.dispatch(ADD_COUNTBACK, {
                    resultId: result.id,
                    countback: index + 1
                })
            }))
        }
    }
}
</script>
