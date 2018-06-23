<template>
    <div class="footer-container">
        <ul>
            <li v-for="(item,index) in navs" @click="jump(item.path,index)" :key="index">
                <div class="item" v-if="index!==2">
                    <span :class="tagIdx===index?item.iconActive:item.icon"></span>
                    <p :style="{color:tagIdx===index?'#08fd64':'#fff'}">{{item.name}}</p>
                </div>
                <div class="image" v-else>
                    <img :src="tagIdx===index?item.src:item.scrActive" alt="">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import  {mapMutations,mapGetters} from 'vuex'
export default {
    data() {
        return {
            navs: [
                {name: '游戏', path: '/home', icon: 'icon-game', iconActive: 'icon-game-active'},
                {name: '优惠', path: '/activity', icon: 'icon-activity', iconActive: 'icon-activity-active'},
                {
                    src: require(`../assets/footer/enterGameSelected.png`),
                    scrActive: require(`../assets/footer/enterGame.png`)
                },
                {name: '充值', path: '/recharge', icon: 'icon-recharge', iconActive: 'icon-recharge-active'},
                {name: '账号', path: '/account', icon: 'icon-account', iconActive: 'icon-account-active'},
            ],
            tagIdx: 0,
        }
    },
    computed: {
        ...mapGetters([
            'userInfo'
        ])
    },
    created(){
        let userInfo = this.$tool.getSession('userInfo') === null ?{}:this.$tool.getSession('userInfo')
        this.setUserInfo(userInfo)
        this.getPath()
    },
    methods: {
        jump(path, index) {
            if((this.userInfo._id || index === 0 || index === 1)&& index!==2){
                if (this.tagIdx === index) return false
                this.tagIdx = index
                this.$router.push(path)
            }else if(!this.userInfo._id){
                this.$router.push('/login')
            }else if(index ===2){
                //进入游戏
                console.log('进入游戏')
            }
        },
        getPath(){
            switch(this.$route.path){
                case '/home':
                    this.tagIdx = 0
                    break;
                case '/activity':
                    this.tagIdx = 1
                    break;
                case '/recharge':
                    this.tagIdx = 3
                    break;
                default:
                    this.tagIdx = 4
            }
        },
        ...mapMutations({
            'setUserInfo':'SET_USER_INFO'
        })
    },
    watch: {
        '$route':'getPath'
    },
}
</script>
<style lang="scss" scoped>
    .footer-container {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.6rem;
        color: #fff;
        font-weight: bold;
        background-color: #0b6db8;
        ul {
            display: flex;
            width: 100%;
            text-align: center;
            li {
                width: 18%;
                &:nth-child(3) {
                    flex: 1;
                }
                .item {
                    overflow: hidden;
                    span {
                        display: block;
                        width: 25px;
                        height: 25px;
                        margin: .3rem auto .1rem;
                    }
                    .icon-game {
                        background: url("../assets/footer/game.png") no-repeat center;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                    .icon-game-active {
                        background: url("../assets/footer/gameSelected.png") no-repeat center;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                    .icon-activity {
                        background: url("../assets/footer/promotion.png") no-repeat center;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                    .icon-activity-active {
                        background: url("../assets/footer/promotionSelected.png") no-repeat center;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                    .icon-recharge {
                        background: url("../assets/footer/cashInOrOut.png") no-repeat center;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                    .icon-recharge-active {
                        background: url("../assets/footer/cashInOrOutSelected.png") no-repeat center;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                    .icon-account {
                        background: url("../assets/footer/account.png") no-repeat center;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                    .icon-account-active {
                        background: url("../assets/footer/accountSelected.png") no-repeat center;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                }
            }
        }
        .image {
            position: relative;
            flex: 1;
            text-align: center;
            img {
                margin-top: -25%;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
