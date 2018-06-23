<template>
    <div class="userinfo-container">
        <header-nav
            :csLogo="false"
            :rightText="rightText"
        ></header-nav>
        <div class="userinfo-content">
            <ul>
                <li class="avatar" @click="avatarShow = true">
                    <label>头像</label>
                    <div class="right-text">
                        <img :src="avatarUrl" alt="" width="100%">
                    </div>
                </li>
                <li>
                    <label>会员账号</label>
                    <div class="right-text">
                        <span>{{userInfo.name}}</span>
                    </div>
                </li>
                <li>
                    <label>真实姓名</label>
                    <div class="right-text">
                        <span>{{userInfo.realName}}</span>
                    </div>
                </li>
                <li>
                    <label>绑定电话</label>
                    <div class="right-text">
                        <span>{{userInfo.phoneNumber}}</span>
                    </div>
                </li>
                <li>
                    <label>绑定邮箱</label>
                    <div class="right-text">
                        <span>{{userInfo.email}}</span>
                    </div>
                </li>
                <li>
                    <label>开户时间</label>
                    <div class="right-text">
                        <span style="font-size: 14px">{{userInfo.registrationTime | dateChange }}</span>
                    </div>
                </li>
                <li>
                    <label>账户ID</label>
                    <div class="right-text">
                        <span>{{userInfo.playerId}}</span>
                    </div>
                </li>
            </ul>
            <div class="line"></div>
            <ul class="userinfo-change">
                <router-link tag="li" to="/changePwd">
                    <label>修改账户密码</label>
                    <div class="right-text">
                        <i></i>
                    </div>
                </router-link>
                <router-link tag="li" to="/setSMSNotice">
                    <label>短信设置</label>
                    <div class="right-text">
                        <i></i>
                    </div>
                </router-link>
            </ul>
        </div>

        <transition name="fade">
            <div class="mask" v-show="avatarShow" @click="avatarShow = false">
                <ul class="avatar-list">
                    <li v-for="(avatar,index) in avatarList"
                        :key="index" @click.stop="choiceAvatar(avatar.url,index)">
                        <img :src="require(`../../assets/avatar/${avatar.url}`)" :class="{'active':avatarIndex === index}" alt="">
                    </li>
                </ul>
            </div>
        </transition>

    </div>
</template>

<script>
import HeaderNav from 'components/Header'
import avatarList from './avatarlist';
import api from 'tool/api'
import {mapMutations,mapGetters} from 'vuex'
export default {
    data() {
        return {
            rightText: '',
            avatarShow:false,
            avatarList:avatarList(),
            avatarIndex:0,
        }
    },
    computed: {
        avatarUrl() {
            let avatar = this.userInfo.photoUrl ? this.userInfo.photoUrl : '1.jpg';
            return require(`../../assets/avatar/${avatar}`)
        },
        ...mapGetters(
            ['userInfo']
        )
    },
    created() {
        let avatar = this.userInfo.photoUrl ? this.userInfo.photoUrl : '1.jpg';
        this.avatarIndex = Number(avatar.split('.')[0])-1
    },
    methods: {
        choiceAvatar(url,index) {
            if (this.avatarIndex === index) return false
            this.avatarIndex = index
            setTimeout(()=>{
                this.$tool.CONFIRM(
                    {
                        text: '确认修改头像吗？',
                        okFun: () => {
                            api.updatePhotoUrl({photoUrl: url}).then(() => {
                                //更改成功
                                this.userInfo.photoUrl = url;
                                this.$tool.ALERT({text: '修改成功', type: 'success'})
                                //更新session
                                this.$tool.setSession('userInfo',this.userInfo)
                                //更新state
                                this.setUserInfo(this.userInfo);
                                this.avatarShow = false
                            })
                        },
                        noFun: () => {

                        }
                    })
            },1000)
        },
        ...mapMutations({
            setUserInfo:'SET_USER_INFO'
        })
    },
    components: {
        HeaderNav
    }
}
</script>

<style scoped lang="scss">
    .userinfo-container {
        width: 100%;
        height: 100%;
        padding-top: 1rem;
        .userinfo-content {
            width: 100%;
            background-color: #fff;
            ul > li {
                position: relative;
                padding: 0 .4rem;
                height: 1rem;
                line-height: 1rem;
                border-bottom: 1px solid #ccc;
                label {
                    position: absolute;
                    top: 50%;
                    font-size: 16px;
                    transform: translateY(-50%);
                }
                div {
                    text-align: right;
                    padding-right: 0.2rem;
                    span{
                        font-size: 16px;
                    }
                }
                &.avatar {
                    height: 2rem;
                    div.right-text {
                        position: absolute;
                        top: 50%;
                        right: 0.5rem;
                        width: 1.6rem;
                        height: 1.6rem;
                        border-radius: 50%;
                        padding: 0;
                        border: 3px solid #2d9efa;
                        transform: translateY(-50%);
                        overflow: hidden;
                    }
                }
            }
            .line{
                width: 100%;
                height: 0.3rem;
                background: #ccc;
            }
            ul.userinfo-change {
                .right-text {
                    padding-right: 0.5rem;
                    i{
                        position: absolute;
                        width: 0.42rem;
                        height: 0.42rem;
                        top: 50%;
                        right: 0.2rem;
                        transform: translateY(-50%);
                        background: url("../../assets/account/right.png") no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }


        .avatar-list{
            position: absolute;
            display: flex;
            flex-wrap: wrap;
            top: 50%;
            left: 50%;
            width: 95%;
            padding: 0.5rem 0.1rem;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            transform: translate(-50%,-50%);
            li {
                flex: 1;
                margin: 0.1rem 0;
                img{
                    display: block;
                    width: 1.5rem;
                    height: 1.5rem;
                    margin: 0 auto;
                    border-radius: 5px;
                    transition: all .3s;
                }
                .active{
                    border: 3px solid #feb403;
                }
            }
        }
    }
</style>
