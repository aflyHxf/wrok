<template>
    <div class="header-container">
        <div class="left">
            <!--客服-->
            <div v-if="csLogo">
                <a href="http://wpd.b.qq.com/page/webchat.html?nameAccount=800805366"
                target="_blank">
                    <i class="icon icon-cs"></i>
                    客服
                </a>
            </div>
            <!--返回-->
             <div v-else @click="goBack">
                <span class="icon icon-back"></span>
                <span class="text">返回</span>
            </div>

        </div>
        <div class="middle">
            <img src="../assets/header/logo.png" alt="" v-if="!title">
            <span v-else>{{title}}</span>
        </div>
        <div class="right" v-if="rightText">
            <div v-if="rightText === '登录'">
                <router-link to="/register" tag="span">注册</router-link> /
                <router-link to="/login" tag="span">登录</router-link>
            </div>
           <div v-else-if="rightText === '退出'" @click="loginOut">
               <span>退出</span>
           </div>
        </div>
    </div>
</template>

<script>
import api from 'tool/api'
import {mapMutations,mapGetters} from 'vuex'
export default {
    //当显示logo时，即头部标题为空，左边显示客服，右边显示注册/登录
    //否则，左边显示返回，右边为空
    props: {
        title: { //title：头部标题，默认为空,没有时显示logo
            type: String,
            default: ''
        },
        csLogo:{ //头部的logo，默认显示
            type:Boolean,
            default:true
        },
        rightText:{ //右边的按钮的值
            type:String,
            default:''
        }
    },
    computed:{
        ...mapGetters([
            'userInfo'
        ])
    },
    created(){
        //获取客服地址
    },
    methods:{
        loginOut(){
            //退出
            this.$tool.CONFIRM(
                {
                    text: '确认退出吗？',
                    okFun: () => {
                        let {playerId} = this.userInfo
                        api.logout({playerId}).then(res => {
                            this.$tool.ALERT({text:'退出成功！',type:'success'})
                            //清空用户信息
                            this.$tool.removeSession('userInfo');
                            //清空state,userInfo
                            this.setUserInfo({})
                            this.$router.push('/home')
                        })
                    },
                    noFun: () => {
                    }
                })
        },
        goBack(){
            history.back()
        },
        ...mapMutations({
            setUserInfo:'SET_USER_INFO'
        })
    }
}
</script>
<style lang="scss" scoped>
    .header-container {
        position: absolute;
        display: flex;
        top: 0;
        width: 100%;
        height: 1rem;
        color: #fff;
        padding: 0 2rem;
        line-height: 1rem;
        justify-content: space-between;
        background-color: rgb(12, 108, 185);
        .left {
            position: absolute;
            top: 0;
            left: 0.2rem;
            width: 2rem;
            height: 100%;
            .icon {
                display: inline-block;
                vertical-align: middle;
            }
            .icon-cs {
                width: .5rem;
                height: .5rem;
                margin-top: -.05rem;
                background: url("../assets/header/cs.png") no-repeat;
                background-size: contain;
            }
            .icon-back {
                width: .42rem;
                height: .42rem;
                background: url("../assets/header/back.png") no-repeat;
                background-size: 100% 100%;
            }
            a{
                padding: 0.2rem 0;
                color: #fff;
            }
        }
        .middle {
            width: 100%;
            height: 100%;
            text-align: center;
            overflow: hidden;
            img {
                height: 100%;
            }
            span {
                font-size: 16px;
                font-weight: bold;
            }
        }
        .right {
            position: absolute;
            top: 0;
            right: 0.2rem;
            text-align: center;
            font-size: 16px;
        }
    }
</style>
