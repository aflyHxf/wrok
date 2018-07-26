import Vue from 'vue'
import Router from 'vue-router'
// 首页
const Home = () => import('pages/home/home')
const Login = () => import('pages/login')
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      component: Home
    },
    // 登录
    {
      path: '/login',
      component: Login
    }
  ]
})
