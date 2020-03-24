import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (timestamp) => {
    if (!timestamp) return

    return moment(timestamp.toDate()).format('Do MMM YYYY')
})
