<template>
    <div class="header-container">
      <div class="logo">
        <img src="../assets/img/icon/header_logo.png" alt="">
      </div>
      <router-link class="right-text"
                   tag="span"
                   to="/login">登录 / 注册
      </router-link>
      <div class="email" v-if="emailMsg">
        <span></span>
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'header-bar',
  computed: {
    ...mapGetters([
      'emailMsg'
    ])
  }
}
</script>

<style scoped lang="less">
  .header-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.12rem;
    line-height: 1.12rem;
    background: #181818;
    .logo{
      width: 50%;
      height: 100%;
      margin: 0 auto;
      text-align: center;
      overflow: hidden;
      img{
        width: 2.16rem;
        height: .77rem;
        margin-top: .175rem;
      }
    }
    .right-text{
      position: absolute;
      top: 0;
      right: 0.32rem;
      color: #fff;
    }
    .email{
      position: absolute;
      top: 0;
      right: 0;
      width: 2rem;
      height: 100%;
      z-index: 999;
      span{
        position: absolute;
        top: 50%;
        right: .56rem;
        width: .54rem;
        height: .42rem;
        transform: translateY(-50%);
        background: url("../assets/img/icon/mail.png") no-repeat center / 100% 100%;
      }
    }
  }
</style>
