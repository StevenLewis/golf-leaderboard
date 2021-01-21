<template>
    <div class="flex flex-col mb-10">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200">
                <table class="min-w-full">
                    <thead>
                        <th class="px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                        <th class="px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Player</th>
                        <th class="px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th class="hidden md:table-cell px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Cuts</th>
                        <th class="px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nett</th>
                        <th class="hidden md:table-cell px-2 py-2 md:px-6 md:py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Winnings</th>
                    </thead>
                    <tbody>
                        <tr v-for="(result, index) in results" :key="result.id" :class="background(index)">
                            <td class="px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ index + 1 }}</td>
                            <td class="px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                <router-link :to="{ name: 'players.show', params: { id: result.player.id } }" class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">{{ result.player.name }}</router-link>
                                <template v-if="result.player.isGuest"> (G)</template>
                            </td>
                            <td class="px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.score }}</td>
                            <td class="hidden md:table-cell px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.cuts }}</td>
                            <td class="px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ result.nett }}</td>
                            <td v-if="prizes" class="hidden md:table-cell px-2 py-2 md:px-6 md:py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">{{ prizes[index] | sterling }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResultsTable',

    props: {
        results: {
            required: true,
            type: Array
        }
    },

    methods: {
        background (index) {
            switch (index) {
            case 0:
                return 'bg-yellow-100 bg-opacity-50'
            case 1:
                return 'bg-blue-100 bg-opacity-50'
            case 2:
                return 'bg-orange-100 bg-opacity-50'
            default:
                return index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            }
        }
    }
}
</script>
