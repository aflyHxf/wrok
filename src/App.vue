<template>
  <div id="app" :style="{paddingBottom:paddingBottom}">
    <router-view />
    <transition name="fade" mode="out-in" appear>
      <loading></loading>
    </transition>
    <confirm></confirm>
    <footer-bar v-if="footerShow"></footer-bar>
  </div>
</template>

<script>
import FooterBar from './components/footer-bar'
import Loading from './components/loading'
import Confirm from './components/plugins/Confirm'
export default {
  name: 'App',
  data () {
    return {
      footerShow: true,
      paddingBottom: 0
    }
  },
  created () {
    // 将router 挂载到tool 上面
    this.$tool.router = this.$router
  },
  methods: {
    pathUrl () {
      // 所有不需要添加页脚的页面
      let pathUrlList = ['/login', '/register']
      if (pathUrlList.includes(this.$route.path)) {
        this.paddingBottom = 0
        this.footerShow = false
      } else {
        this.footerShow = true
        this.paddingBottom = '1.46rem'
      }
    }
  },
  watch: {
    '$route': 'pathUrl'
  },
  components: {
    FooterBar,
    Loading,
    Confirm
  }
}
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    color: #3c3c3c;
    font-size: 14px;
  }
</style>
