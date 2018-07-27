<template>
  <div class="login-container">
    <!--logo-->
    <img class="logo" src="../assets/img/login/xbet-logo-main.png" alt="">
    <div class="login-form">
      <div class="item">
        <input type="text" placeholder="用户名" v-model.trim="username">
      </div>
      <div class="item">
        <input type="password" placeholder="密码" v-model.trim="password">
      </div>
      <div class="item" v-if="loginTimes>2">
        <input type="text" placeholder="验证码" v-model.trim="vCode">
      </div>
    </div>
    <div class="forget">
      <div>
        <a href="">忘记密码了?</a>
      </div>
    </div>
    <div class="login-form submit">
      <div class="item" @click="login">登入</div>
      <div class="item">注册</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      vCode: '',
      loginTimes: 0
    }
  },
  methods: {
    login () {
      if (!this.username) {
        this.$confirm({text: '用户名不能为空'})
        return false
      }
      if (!this.password) {
        this.$confirm({text: '密码不能为空'})
        return false
      }
      let data = {
        name: this.username,
        password: this.password,
        clientDomain: location.origin
      }
      if (this.loginTimes > 2) {
        if (!this.vCode) {
          this.$confirm({text: '验证码不能为空'})
          return false
        }
        data.captcha = this.vCode
      }
      this.$api.login(data).then(res => {
        // 因为login返回的data(个人信息)和get 返回的data不一样
        // 登录成功之后去请求get ,将get 的数据放在userInfo中
        //    将用户信息存在sessionStorage
        this.$tool.setSession('token', res.token)
        let {playerId} = res.data
        this.getUserInfo(playerId)
        this.$router.push('/home')
      }).catch(() => {
        this.loginTimes++
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login-container{
    height: 100%;
    background: url("../assets/img/login/bg_login.png") no-repeat center /100% 100%;
    overflow: hidden;
    .logo{
      display: block;
      width: 4.34rem;
      height: 1.58rem;
      margin: 2.46rem auto 1.43rem;
    }
    .login-form {
      padding:0 1.12rem;
      .item{
        position: relative;
        width: 100%;
        font-size: 12px;
        height: 1.16rem;
        line-height: 1.16rem;
        margin-bottom: .25rem;
        border: 0.02rem solid @borderColor;
        border-radius: 0.08rem;
        overflow: hidden;
        &:last-child{
          margin-bottom: 0;
        }
        input{
          display: block;
          width: 100%;
          height: 100%;
          border: none;
          padding-left: .46rem;
        }
      }
    }
    .forget {
      padding: 0 1.08rem;
      height: 1.12rem;
      line-height: 1.12rem;
      div{
        height:100%;
        text-align: center;
        border-bottom: 1px solid @borderColor;
        a{
          text-decoration: underline;
          color: #f2f2f2;
          font-size: 12px;
        }
      }
    }
    .submit > .item {
      margin-top: .44rem;
      text-align: center;
      color: #fff;
      font-size: 18px;
      background: @secondColor;
      &:first-child{
        background: @themeColor;
      }
    }
  }
</style>
