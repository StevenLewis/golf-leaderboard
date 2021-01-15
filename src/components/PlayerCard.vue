<template>
    <li class="block border-b border-gray-200">
        <div class="flex items-center px-3 py-3 sm:px-6">
            <div class="min-w-0 flex-1 flex items-center">
                <div class="min-w-0 flex-1 pr-3 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                        <div class="text-sm leading-5 font-medium text-indigo-600 truncate">
                            {{ player.name }}
                            <span v-if="player.isGuest" class="text-gray-400"> Guest</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <svg @click.prevent="remove" viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer">
                    <path class="heroicon-ui" d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"/>
                </svg>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'PlayerCard',

    props: {
        player: {
            type: Object,
            required: true
        }
    },

    methods: {
        remove () {
            this.$emit('removed', this.player.id)
        }
    }
}
</script>
