<template>
    <div id="seasons">
        <header>
            <h1 class="mb-5 text-3xl font-bold leading-tight text-gray-900">Seasons</h1>
        </header>
        <div class="flex flex-col mb-10">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Season</th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Competitions</th>
                        </thead>
                        <tbody>
                            <tr v-for="(season, index) in seasons" :key="season.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    <router-link :to="{ name: 'seasons.show', params: { id: season.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ season.name }}</router-link>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                    {{ season.competitions.length }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'AllSeasons',

    computed: {
        ...mapGetters(['seasons'])
    }
}
</script>
