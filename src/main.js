// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueTap from 'v-tap'
import { Datetime, Group } from 'vux'
import $ from '../utils/jquery-3.2.1.min';
import axios from 'axios'
import store from './vuex/store'

Vue.config.productionTip = false

// v-tap
Vue.use(vueTap)

// vux components
Vue.component(Datetime.name, Datetime)
Vue.component(Group.name, Group)

// jquery
window.jQuery = $
window.$ = $

// axios
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: { App }
})
