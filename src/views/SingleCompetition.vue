<template>
  <div>
    <header>
      <h4>{{ competition.date | formatDate }}</h4>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SingleCompetition',

    computed: {
        ...mapState(['competitions']),

        competition () {
            return this.competitions[this.$route.params.id] || {}
        }
    }
}
</script>
