// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import store from './store/store'
import axios from 'axios'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.$axios = axios

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store: store,
  router,
  render: h => h(App)
})
