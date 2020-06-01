import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'
import * as firebase from 'firebase'

import './assets/app.css'
import { FETCH_USER } from './action-types'

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
    store.dispatch(FETCH_USER, user)
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
