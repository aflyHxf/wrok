<template>
    <div class="account-container">
        <header-nav :rightText="rightText" :title="title"></header-nav>
        <ul class="nav-list">
            <router-link tag="li"
                         v-for="(item,index) in navbarList"
                         :key="index"
                         :to="item.path">
                <img :src="item.src" alt="">
                <span>{{item.text}}</span>
                <i></i>
            </router-link>
        </ul>
    </div>
</template>

<script>
import HeaderNav from 'components/Header'
export default {
    data () {
        return {
            title:'账户中心',
            rightText:'退出',
            navbarList:[
                {text:'账户中心',src: require('../../assets/account/user.png'),path:'/accountInfo'},
                {text:'申请优惠',src: require('../../assets/account/tag.png'),path:'/activity'},
                {text:'记录查询',src: require('../../assets/account/note.png'),path:'/recordSearch'},
                {text:'最新消息',src: require('../../assets/account/msg.png'),path:'/news'},
                {text:'站内信',src: require('../../assets/account/inbox.png'),path:'/inbox'},
            ],
        }
    },
    components:{
        HeaderNav
    }

}
</script>

<style scoped lang="scss">
.account-container{
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    background-color: #fff;
    .nav-list{
        width: 100%;
        overflow: hidden;
        li{
            position: relative;
            padding: 0 1rem;
            height: 1rem;
            line-height: 1rem;
            border-bottom: 1px solid #f5f5f5;
            font-size: 16px;
            img{
                position: absolute;
                top: 50%;
                left: 0.4rem;
                width: 0.6rem;
                height: 0.6rem;
                transform: translateY(-50%);
            }
            span{
                margin-left: 0.3rem;
            }
            i{
                position: absolute;
                top: 50%;
                right: 0.5rem;
                width: 0.42rem;
                height: 0.42rem;
                transform: translateY(-50%);
                background:url("../../assets/account/right.png") no-repeat center;
                background-size: 100% 100%;
            }
        }
    }
}
</style>
