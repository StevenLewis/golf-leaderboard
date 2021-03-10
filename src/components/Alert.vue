<template>
    <div v-if="isVisible" class="rounded-md mb-4 p-4" :class="backgroundColor">
        <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5" :class="iconColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path v-if="type === 'success'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    <path v-if="type === 'danger'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-medium" :class="textColor">
                    {{ title }}
                </h3>
                <div class="mt-2 text-sm" :class="textColor">
                    <p>
                        {{ message }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Alert',

    data () {
        return {
            isVisible: false,
            type: 'success',
            message: ''
        }
    },

    computed: {
        backgroundColor () {
            const colors = {
                'success': 'bg-green-50',
                'danger': 'bg-red-50'
            }

            return colors[this.type]
        },

        iconColor () {
            const colors = {
                'success': 'text-green-400',
                'danger': 'text-red-400'
            }

            return colors[this.type]
        },

        textColor () {
            const colors = {
                'success': 'text-green-800',
                'danger': 'text-red-800'
            }

            return colors[this.type]
        },

        title () {
            const titles = {
                'success': 'Success',
                'danger': 'Something went wrong'
            }

            return titles[this.type]
        }
    },

    methods: {
        show (message, type = 'success') {
            this.message = message
            this.type = type
            this.isVisible = true

            setTimeout(this.close, 3000)
        },

        close () {
            this.isVisible = false
            this.message = ''
            this.type = ''
        }
    }
}
</script>
