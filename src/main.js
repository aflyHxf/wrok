import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import Confirm from './components/plugins/plugins'
import './util/rem'
import tool from './util/tool'
import api from './util/api'
import './assets/css/base.css'
// 移除移动端页面点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)
Vue.use(Confirm)
// 创建全局变量
Vue.prototype.$tool = tool
Vue.prototype.$api = api

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
