<template>
    <div class="register-container">
        <header-nav
            :title="title"
            :csLogo="false"></header-nav>
        <div class="register-content">
            <p class="title">注册信息</p>
            <div>
                <i class="game"></i>
                <span> *</span>
                <b>申请账号：</b>
                <input type="text" placeholder="请输入6-12位小写字母与数字" v-model.trim="username">
            </div>
            <div>
                <i class="lock"></i>
                <span> *</span>
                <b>申请密码：</b>
                <input type="password" placeholder="请输入密码" v-model.trim="password">
            </div>
            <div>
                <i class="lock"></i>
                <span> *</span>
                <b>确认密码：</b>
                <input type="password" placeholder="请再次输出密码" v-model.trim="passwordRepeat">
            </div>
            <div>
                <i class="phone"></i>
                <span> *</span>
                <b>手机号码：</b>
                <input type="text" placeholder="更改资料和找回密码的唯一途径" v-model="telephoneNum">
            </div>
            <div>
                <i class="safe"></i>
                <span> *</span>
                <b>验证码：</b>
                <input type="text" placeholder="验证码" v-model="SMSCode">
                <label @click="getSmsCode" :class="{'bg-gray':timer}">{{timer?count+'S后重新获取':'获取验证码'}}</label>
            </div>
            <div class="submit" @click="submitRegister">立即申请</div>
        </div>

    </div>
</template>

<script>
import HeaderNav from 'components/Header'
import api from 'tool/api'
import {mapMutations} from 'vuex'
export default {
    data () {
        return {
            title:'免费注册',
            username:'',
            password:'',
            passwordRepeat:'',
            telephoneNum:'',
            SMSCode:'',
            timer:null,
            count:120
        }
    },
    methods:{
        getSmsCode(){
            if(this.timer) return false
            let SMSCodeData = {
                phoneNumber: this.telephoneNum,
                purpose: 'registration',
                name: this.username
            }
            let telephoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
            if(!telephoneReg.test(this.telephoneNum)){
                this.$tool.ALERT({text: '请输入正确的手机号', type: 'warn'})
                return false
            }
            api.getSMSCode(SMSCodeData).then(res=>{
                if(res.data){
                    this.timer = setInterval(()=>{
                        this.count--
                        if(this.count === 0){
                            clearInterval(this.timer)
                            this.timer = null
                        }
                    },1000)
                }
            })
        },
        submitRegister(){
            //  用户名
            let usernameReg = /^[a-z0-9]{6,12}/
            if (!this.username) {
                this.$tool.ALERT({text: '请填写用户名', type: 'warn'})
                return false
            }
            if (!usernameReg.test(this.username)) {
                this.$tool.ALERT({text: '用户名为6-12位小写字母与数字', type: 'warn'})
                return false
            }

            if(!this.password){
                this.$tool.ALERT({text: '请输入密码', type: 'warn'})
                return false
            }
            if(!this.passwordRepeat){
                this.$tool.ALERT({text: '请再次输入密码', type: 'warn'})
                return false
            }
            if (this.password !== this.passwordRepeat) {
                this.$tool.ALERT({text: '两次输入的密码不一致', type: 'warn'})
                return false
            }

            if(!this.telephoneNum){
                this.$tool.ALERT({text: '请输入手机号', type: 'warn'})
                return false
            }
            if(!this.SMSCode){
                this.$tool.ALERT({text: '请输入验证码', type: 'warn'})
                return false
            }
            let data = {
                name:this.username,
                password:this.password,
                phoneNumber:this.telephoneNum,
                smsCode:this.SMSCode,
                clientDomain:location.origin
            }
            api.create(data).then(res=>{
                this.$tool.ALERT({text: '恭喜您，注册成功！', type: 'warn'})
                let userInfo = res.data;
                userInfo.token = res.token
                this.$tool.setSession('userInfo',userInfo)
                this.setUserInfo(userInfo)
                setTimeout(()=>{
                    this.$router.push('/home')
                },2000)
            })
        },
        ...mapMutations({
            setUserInfo:'SET_USER_INFO'
        })
    },
    components:{
        HeaderNav
    }
}
</script>
<style scoped lang="scss">
    .register-container{
        width: 100%;
        height: 100%;
        padding-top: 1rem;
        background-color: #fff;
        .register-content{
            width: 100%;
            height: 100%;
            padding: 0 0.3rem;
            overflow: hidden;
            .title{
                margin: 0.3rem 0 0.2rem;
                font-size: 16px;
            }
            div {
                position: relative;
                width: 100%;
                height: .92rem;
                line-height: .92rem;
                padding-left: 0.9rem;
                margin: 0 auto 0.3rem;
                border-radius: 4px;
                background-color: #dad6d7;
                overflow: hidden;
                i{
                    position: absolute;
                    top: 50%;
                    left: 0.2rem;
                    width: 0.6rem;
                    height: 0.6rem;
                    transform: translateY(-50%);
                    &.game{
                        background: url("../../assets/register/game.png") no-repeat center;
                        background-size: cover;
                    }
                    &.lock{
                        background: url("../../assets/register/lock.png") no-repeat center;
                        background-size: cover;
                    }
                    &.phone{
                        background: url("../../assets/register/phone.png") no-repeat center;
                        background-size: cover;
                    }
                    &.safe{
                        background: url("../../assets/register/safe.png") no-repeat center;
                        background-size: cover;
                    }
                }
                span{
                    color: red;
                    font-family: Tahoma,Helvetica,Arial,Microsoft Yahei,微软雅黑,STXihei,华文细黑,sans-serif!important;
                    font-weight: bold;
                }
                label{
                    position: absolute;
                    top: 0.05rem;
                    right: 0.1rem;
                    color: #fff;
                    height: .8rem;
                    line-height: .8rem;
                    font-size: 12px;
                    padding: 0 0.2rem;
                    border: 1px solid #1880d5;
                    background: #1880d5;
                    border-radius: 6px;
                }
                .bg-gray{
                    color: #555;
                    background:transparent;
                }
                input {
                    min-width: 4rem;
                    height: 100%;
                    border: none;
                    background-color: transparent;
                }
                &.submit{
                    padding: 0;
                    margin-top: 0.6rem;
                    text-align: center;
                    color: #fff;
                    font-size: 18px;
                    background: #337ab7;
                }
            }
        }
    }
</style>
