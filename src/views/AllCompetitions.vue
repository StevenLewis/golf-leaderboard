<template>
  <div>
    <h3>All Competitions</h3>
    <ul>
      <li v-for="competition in competitions" :key="competition.id">
        <router-link :to="{ name: 'competitions.show', params: { id: competition.id } }">{{ competition.date | formatDate }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            name: ''
        }
    },

    computed: {
        ...mapGetters(['competitions'])
    }
}
</script>
