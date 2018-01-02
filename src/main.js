// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueTap from 'v-tap'
import { Datetime, Group } from 'vux'
import $ from '../static/jquery-3.2.1.min';
import axios from 'axios'
import store from './vuex/store'
import common from '../static/common.js'

Vue.config.productionTip = false

// v-tap
Vue.use(vueTap)

// vux components
Vue.component(Datetime.name, Datetime)
Vue.component(Group.name, Group)

// jquery
window.jQuery = $
window.$ = $
window.common = common

router.beforeEach(function (to, from, next) {
  // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
  let isBack = router.isBack
  console.log('isBack:' + isBack)
  if (isBack) {
    store.state.direction = 1
  } else {
    store.state.direction = 0
  }
  // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
  router.isBack = false
  next()
})

// axios
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用store
  template: '<App/>',
  components: { App }
})
