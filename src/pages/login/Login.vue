<template>
    <div class="login-container">
        <header> <span @click="goBack"><i></i>返回</span></header>
        <div class="logo"></div>
        <div class="login-content">
            <div>
                <i class="username"></i>
                <input type="text" placeholder="请输入您的用户名" v-model.trim="username">
            </div>
            <div>
                <i class="password"></i>
                <input type="password" placeholder="请输入您的密码" v-model.trim="password">
            </div>
            <div>
                <p @click="login">登录</p>
            </div>
        </div>
        <div class="link">
            <a href="">忘记密码</a>
            <router-link to="/register">免费开户</router-link>
        </div>
    </div>
</template>

<script>
import api from 'tool/api'
import {mapMutations} from 'vuex'
export default {
    data () {
        return {
            username:'',
            password:''
        }
    },
    methods:{
        login(){
            if(!this.username){
                this.$tool.ALERT({text:'请输入用户名',type:'warn'})
                return false
            }
            if(!this.password){
                this.$tool.ALERT({text:'密码不能为空',type:'warn'})
                return false
            }
            let data = {
                name: this.username,
                password: this.password,
                clientDomain:location.origin
            };
            api.login(data).then(res => {
                //    将用户信息存在sessionStorage
                let userInfo = res.data;
                userInfo.token = res.token
                this.$tool.setSession('userInfo',userInfo);
                this.setUserInfo(userInfo)
                this.$router.push('/home')
            })
        },
        goBack(){
            history.back()
        },
        ...mapMutations({
            setUserInfo:'SET_USER_INFO'
        })
    },

}
</script>
<style lang="scss" scoped>
    .login-container {
        width: 100%;
        height: 100%;
        padding: 0 .2rem;
        background: url("../../assets/login/login_bg.jpg") no-repeat center;
        background-size: 100% 100%;
        header{
            height: 1rem;
            line-height: 1rem;
            color: #fff;
            i{
                display: inline-block;
                width: 0.42rem;
                height: 0.42rem;
                vertical-align: middle;
                background: url("../../assets/header/back.png") no-repeat center;
                background-size: contain;
                margin-right:0.1rem;
            }
        }
        .logo{
            width: 3.8rem;
            height: 1.2rem;
            margin: 0.8rem auto 1rem;
            background: url("../../assets/login/login_logo.png") no-repeat center;
            background-size: contain;
        }
        .login-content{
            width: 100%;
            overflow: hidden;
            text-align: center;
           div {
                 position: relative;
                 width: 92%;
                 height: .92rem;
                 line-height: .92rem;
                 margin: 0 auto 0.3rem;
                 overflow: hidden;
                 input {
                     width: 100%;
                     height: 100%;
                     padding-left: .92rem;
                     border-radius: 4px;
                     border: none;
                 }
                 i{
                     position: absolute;
                     top: 50%;
                     left: 0.2rem;
                     width: 0.6rem;
                     height: 0.6rem;
                     transform: translateY(-50%);
                     &.username{
                         background: url("../../assets/login/login_user.png") no-repeat center;
                         background-size: cover;
                     }
                     &.password{
                         background: url("../../assets/login/login_lock.png") no-repeat center;
                         background-size: cover;
                     }
                 }
                 &:last-child{
                     p{
                         height: 100%;
                         text-align: center;
                         font-size: 18px;
                         font-weight: 700;
                         color: #fff;
                         border-radius: 6px;
                         background-color: #ffc001;
                     }
                 }
             }
        }
        .link{
            margin-top: 1rem;
            text-align: center;
           a{
               color: #fff;
               text-decoration:underline;
               margin: 0 .5rem;
           }
        }
    }
</style>
