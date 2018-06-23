<template>
    <div class="recharge-container">
        <header-nav :rightText="rightText"></header-nav>
        <img class="recharge-bg" src="../../assets/recharge/banner.jpg" alt="">
        <div class="recharge-content">
            <!--金额输入框-->
            <div class="money-input">
                <label>充值金额</label>
                <input type="text" placeholder="请输入充值金额">
            </div>
            <div class="remind-text">
                <p>单笔充值限额最低10元，快捷支付、QQwap单笔充值上限最高5000元。</p>
            </div>
            <ul class="recharge-ways">

            </ul>
        </div>
    </div>
</template>

<script>
import HeaderNav from 'components/Header'

export default {
    data() {
        return {

            srcRec: require('../../assets/icons/icon-nav2.png'),
            noB: true,
            rightText: '',
            tagIdx: 0
        }
    },
    methods: {
        changeTitle(index) {
            if (this.tagIdx === index) return false
            this.tagIdx = index
        }
    },
    components: {
        HeaderNav
    }
}
</script>
<style scoped lang="scss">
    .recharge-container {
        width: 100%;
        height: 100%;
        padding-top: 1rem;
        .recharge-bg {
            display: block;
            width: 100%;
        }
        .navbar-list {
            display: flex;
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            color: #fff;
            font-weight: bold;
            text-align: center;
            background: #1E8FEB;
            li {
                flex: 1;
            }
            .active {
                color: #03f36e;
                border-bottom: 3px solid #03f36e;
                box-sizing: border-box;
                background-color: #1980d6;
            }
        }
        .recharge-content {
            width: 100%;
            min-height: 5rem;
            padding: 0.6rem 0.3rem;
            background-color: #fff;
            .money-input {
                width: 100%;
                height: .92rem;
                border-radius: 5px;
                border: 1px solid #ccc;
                box-sizing: border-box;
                overflow: hidden;
                background-color: #dad6d7;
                label {
                    height: 100%;
                    line-height: .92rem;
                    font-size: 16px;
                    padding-left: 0.2rem;
                }
                input {
                    height: 100%;
                    margin-left: 0.4rem;
                    background-color: transparent;
                    border: none;
                    outline: none;
                    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
                    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                }
            }
            .remind-text {
                margin-top: 0.2rem;
                font-size: 12px;
                color: #1e8feb;
                font-weight: 500;
            }
            .recharge-ways {
                margin-top: 0.8rem;
                height: 0.8rem;
                border: 1px solid #f00;
            }
        }
    }
</style>
