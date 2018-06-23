<template>
    <div class="onlineRecharge">
        <crumbs  title="在线充值" :src="srcRec"></crumbs>

        <div class="form_box">
            <div class="item">
                <label  flex="cross:center box:first">
                    <div class="name">充值金额</div>
                    <input type="number" placeholder="最低100元">
                </label>
            </div>
            <div class="item">
                <label   flex="cross:center box:first">
                    <div class="name">优惠代码</div>
                    <input type="text"  placeholder="请输入">
                </label>
            </div>
        </div>

        <div class="c_box">
            <h5>选择您的支付方法</h5>
            <ul class="c_btnList">
                <li v-for="(item,index) in payList" :key="index" flex="main:center cross:center">
                    <img :src="item.src" alt="">
                    <div>
                        <p>{{item.content}}</p>
                        <span>{{item.account}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "onlineRecharge",
    data(){
        return{
            srcRec: require('../../assets/icons/icon-onlineRecharge.png'),
            payList:[
                {content:'支付宝APP',account:'100-2000',src:require('../../assets/icons/icon-alipay.png')},
                {content:'微信扫码',account:'100-2000',src:require('../../assets/icons/icon-wechat.png')},
                {content:'支付宝转银行卡',account:'100-2000',src:require('../../assets/icons/icon-alipay.png')},
                {content:'微信转银行卡',account:'100-2000',src:require('../../assets/icons/icon-wechat.png')},
                {content:'快捷支付',account:'100-2000',src:require('../../assets/icons/icon-card.png')},
                {content:'QQ钱包',account:'100-2000',src:require('../../assets/icons/icon-qqPay.png')},
                {content:'银联扫码',account:'100-2000',src:require('../../assets/icons/icon-unionPay.png')},
            ]
        }
    }
}
</script>
