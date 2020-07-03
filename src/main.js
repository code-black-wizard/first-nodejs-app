import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.prototype.$axios = axiosInstance
Vue.use(Notifications)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
