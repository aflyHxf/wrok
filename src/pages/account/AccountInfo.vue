<template>
    <div class="accountInfo-container">
        <header-nav
            :rightText="rightText"
            :title="title"
            :csLogo="false"></header-nav>
        <router-link
            to="/userInfo"
            tag="div"
            class="avatar-title">
            <div class="avatar">
                <img :src="avatarUrl" alt="">
            </div>
            <div class="user-info">
                <b>{{userInfo.name}}</b>
                <span>{{userInfo.playerLevel.name}}</span>
                <div class="money">{{Number(localAmount) + Number(lockAmount)}}</div>
            </div>
            <div class="right">
                <span>基本资料</span>
                <i></i>
            </div>
        </router-link>
        <table class="game-detail">
            <thead>
            <tr>
                <th>游戏大厅</th>
                <th>本地额度</th>
                <th>锁定额度</th>
                <th>游戏额度</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>EFISHFREE</td>
                <td>{{localAmount}}</td>
                <td>{{lockAmount}}</td>
                <td>{{gameAmount}}</td>
            </tr>
            </tbody>
        </table>
        <div class="line"></div>
        <p class="tips">额度转换:将本地额度和游戏额度之间进行转换</p>
        <div class="choose-types">
            <ul>
                <li v-for="(item,index) in itemList"
                    :key="index"
                @click="tagIndex = index">
                    <div class="circle">
                        <i :class="{'active':tagIndex === index}"></i>
                    </div>
                    <span>{{item}}</span>
                </li>
            </ul>
            <div class="translator">
                <p @click="translator">额度转换</p>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderNav from 'components/Header'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            rightText: '登出',
            title: '账户中心',
            tagIndex: 0,
            itemList: [
                '本地转入到游戏', '游戏转出到本地'
            ],
            totalAmount:0,  // 总额度
            localAmount:0, //  本地额度
            lockAmount:0,  //  锁定额度
            gameAmount:0,  //  游戏额度
            providerId:0,
        }
    },

    computed:{
        avatarUrl(){
            let avatar = this.userInfo.photoUrl?this.userInfo.photoUrl:'1.jpg';
            return require(`../../assets/avatar/${avatar}`)
        },
        ...mapGetters([
            'userInfo'
        ])
    },
    created(){
        // 获取当前的各种额度  个人中心 = 本地 + 锁定
        this._getTotalAmount()
    },
    methods: {
        translator(){
            if(this.tagIndex === 0){  // to
                this.$api.transferToProvider({providerId:this.providerId}).then(res=>{
                    this.$tool.ALERT({text: '转换成功', type: 'success'})
                    this._getTotalAmount()
                })
            }else {
                this.$api.transferFromProvider({providerId:this.providerId}).then(res=>{
                    this.$tool.ALERT({text: '转换成功', type: 'success'})
                    this._getTotalAmount()
                })
            }
        },
        _getTotalAmount(){
            this.$api.getCreditDetail().then(res => {
                // 本地
                this.localAmount = Math.round(res.data.credit * 100) / 100;
                //  锁定
                res.data.lockedCreditList.forEach(v => {
                    if (v.nickName === '绿色捕鱼') {
                        this.lockAmount = Math.round(v.lockCredit * 100) / 100
                    }
                })
                // 游戏
                res.data.gameCreditList.forEach(v => {
                    if (v.nickName === 'EFISHFREE') {
                        //拿到游戏ID
                        this.providerId = Number(v.providerId)
                        this.gameAmount = Math.round(v.validCredit * 100) / 100
                    }
                })
            })
        }
    },
    components: {
        HeaderNav
    }
}
</script>

<style scoped lang="scss">
    .accountInfo-container {
        width: 100%;
        height: 100%;
        padding-top: 1rem;
        background-color: #fff;
        .avatar-title {
            display: flex;
            width: 100%;
            height: 2rem;
            color: #fff;
            font-size: 16px;
            padding-top: 0.4rem;
            overflow: hidden;
            background-color: #0c6cb9;
            .avatar {
                width: 1.2rem;
                height: 1.2rem;
                margin: 0 .4rem;
                border: 3px solid #2d9efa;
                border-radius: 50%;
                overflow: hidden;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .user-info {
                flex: 1;
                b {
                    display: block;
                    font-weight: 700;
                    padding-left: 0.1rem;
                }
                span {
                    display: block;
                    font-size: 12px;
                    padding-left: 0.1rem;
                }
                .money {
                    width: 1.4rem;
                    font-size: 14px;
                    text-align: center;
                    border-radius: 4px;
                    background-color: #2d9efa;
                }
            }
            .right {
                width: 2.5rem;
                margin-right: 0.2rem;
                line-height: 1rem;
                font-weight: bold;
                i {
                    display: inline-block;
                    width: .42rem;
                    height: .42rem;
                    vertical-align: middle;
                    margin-top: -0.1rem;
                    background: url("../../assets/account/right.png") no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        table.game-detail {
            width: 100%;
            margin: 0.2rem 0;
            th, td {
                height: 0.85rem;
                line-height: 0.85rem;
                text-align: center;
                border: 1px solid #cecece;
            }
        }
        .line {
            width: 100%;
            height: 0.2rem;
            background: #ccc;
        }
        .tips {
            color: #f00;
            text-align: center;
            margin-top: 0.5rem;
        }
        .choose-types {
            width: 100%;
            margin-top: 0.5rem;
            padding: 0 0.2rem;
            text-align: center;
            ul {
                display: flex;
                li {
                    flex: 1;
                    position: relative;
                    .circle {
                        position: absolute;
                        top: 50%;
                        left: 0.4rem;
                        width: 0.3rem;
                        height: 0.3rem;
                        padding: 0.05rem;
                        border: 1px solid #ccc;
                        border-radius: 50%;
                        transform: translateY(-50%);
                        overflow: hidden;
                        i {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 0.15rem;
                            height: 0.15rem;
                            border-radius: 50%;
                            transform: translate(-50%, -50%);
                        }
                        .active {
                            background-color: #2d9efa;
                        }
                    }
                }
            }
            .translator{
                margin-top: 0.5rem;
                height: 0.8rem;
                line-height: 0.8rem;
                p{
                    width: 80%;
                    height: 100%;
                    margin: 0 auto;
                    color: #fff;
                    font-size: 18px;
                    border-radius: 10px;
                    background: #2d9efa;
                }
            }
        }
    }
</style>
