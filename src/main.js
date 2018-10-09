import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import api from './api'

import '@/icons' // icon
import '@/permission' // permission control
import * as filters from './filters' // global filters

const _LOCAL_DEBUG = false // 开启本地调试（图片上传）

Vue.use(ElementUI)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.api = api

Vue.config.productionTip = false

window.ypw_token = 'Policy GG8FNk5HyX0TiKhTIlpNGFL3qd8=:eyJmc2l6ZUxpbWl0IjogWzAsIDEwNDg1NzYwMF0sICJtaW1lTGltaXQiOiBbImltYWdlL2pwZWciLCAiaW1hZ2UvcG5nIiwgInZpZGVvL21wNCIsICJhdWRpby9tcDMiLCAiYXVkaW8vbXBlZyIsICJpbWFnZS9naWYiLCAiaW1hZ2UvYm1wIl0sICJ1cmwiOiAiaHR0cDovL2ZwLnBzLm5ldGVhc2UuY29tL2dhbWVhcHAvZmlsZS9uZXcvIiwgImNvbG9yIjogZmFsc2UsICJ0aW1lc3RhbXAiOiAxNTM3MTcyODQ4LCAicGluZyI6ICIiLCAibWV0aG9kIjogIlBPU1QifQ=='
window.LOCAL_DEBUG = process.env.NODE_ENV === 'development' && _LOCAL_DEBUG

window.$vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

