import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (timestamp) => {
    return moment(timestamp.toDate()).format('Do MMM YYYY')
})
