import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import feather from 'vue-icon'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.use(feather, 'v-icon')

export { default as Chat } from './components/Chat.vue'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
