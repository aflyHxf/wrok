<template>
    <div class="changePwd-container">
        <header-nav  :csLogo="false"
                     :title="title"></header-nav>
        <div class="changePwd-content">
            <ul>
                <li>
                    <label>旧 密 码：</label>
                    <input class="right-text" type="password" placeholder="请输入原密码" v-model.trim="oldPassword">
                </li>
                <li>
                    <label>新 密 码：</label>
                    <input class="right-text" type="password" placeholder="请输入新密码" v-model.trim="newPassword">
                </li>
                <li>
                    <label>确认密码：</label>
                    <input class="right-text" type="password" placeholder="请输入新密码" v-model.trim="newPasswordRepeat">
                </li>
                <li>
                    <label>手 机 号：</label>
                    <span class="right-text">{{userInfo.phoneNumber}}</span>
                </li>
                <li>
                    <label>短信验证码：</label>
                    <input class="right-text" type="number" placeholder="验证码" v-model="smsCode">
                    <button @click="getSmsCode" :class="{'bg-gray':timer}">{{timer?count+'S后重新获取':'获取验证码'}}</button>
                </li>
            </ul>
            <div class="submit" @click="submitChange">确 认 提 交</div>
        </div>
    </div>
</template>

<script>
import HeaderNav from 'components/Header'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            title: '修改密码',
            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: '',
            smsCode: '',
            timer: null,
            count: 120
        }
    },
    computed: {
        ...mapGetters([
            'userInfo'
        ])
    },
    methods:{
        getSmsCode(){
            // sendSMSCodeToPlayer
            this.$api.sendSMSCodeToPlayer({purpose:'updatePassword'}).then(res=>{
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
        submitChange(){
            if(!this.oldPassword){
                this.$tool.ALERT({text:'请输入原密码',type:'warn'})
                return false
            }
            if(!this.newPassword){
                this.$tool.ALERT({text:'请输入新密码',type:'warn'})
                return false
            }
            if(this.newPassword !== this.newPasswordRepeat){
                this.$tool.ALERT({text:'两次输入的密码不一致',type:'warn'})
                return false
            }
            if(!this.smsCode){
                this.$tool.ALERT({text:'请输入验证码',type:'warn'})
                return false
            }

            // updatePassword
            let data = {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                smsCode: this.smsCode,
                playerId: this.userInfo.playerId
            }
            this.$api.updatePassword(data).then(res=>{
                console.log(res)
                this.$tool.ALERT({text:'修改成功',type:'success'})
            })
        },
    },
    components: {
        HeaderNav
    }

}
</script>

<style scoped lang="scss">
.changePwd-container{
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    background-color: #fff;
    .changePwd-content{
        width: 100%;
        height: 100%;
        padding: 0.2rem .4rem 0 .4rem;
        ul>li{
            position: relative;
            padding: 0.2rem 0;
            margin-top: 0.2rem;
            border-bottom: 1px solid gray;
            &:first-child{
                margin-top: 0;
            }
            label{
                padding: 0 0.2rem;
                height: 100%;
                font-size: 18px;
            }
            .right-text{
               position: absolute;
                top: 50%;
                left: 2.5rem;
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 14px;
                border: none;
                outline: none;
                transform: translateY(-50%);
            }
            button{
                position: absolute;
                top: 42%;
                right: 0;
                padding: 0.2rem 0.3rem;
                font-size: 16px;
                outline: none;
                color: #fff;
                border-radius: 0.1rem;
                transform: translateY(-50%);
                border: 1px solid #00FF5E;
                background:#337ab7 ;
            }
            .bg-gray{
                color: #555;
                background:transparent;
            }
        }
        .submit{
            width: 90%;
            height: 1rem;
            line-height: 1rem;
            margin: 1rem auto;
            font-size: 16px;
            color: #fff;
            text-align: center;
            border-radius: 0.2rem;
            background: #337ab7;
        }
    }
}
</style>
