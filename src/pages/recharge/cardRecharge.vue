<template>
    <div class="cardRecharge">
        <crumbs  title="点卡充值" :src="srcRec"></crumbs>

        <div class="box_group">
            <div class="input_group">
                <span>支付点卡</span>
                <select>
                    <option value="1">神州行全国卡</option>
                </select>
            </div>

            <div class="input_group">
                <span>选择面额</span>
                <ul>
                    <li v-for="(item,index) in howMuch" :key="index" @click="isSelect(index)" :class="selectIndex == index ?'active':''">{{item.num}}</li>
                </ul>
            </div>

            <div class="input_group">
                <span>实际到账</span>
                <input type="number" readonly>
            </div>

            <div class="input_group">
                <span>卡号</span>
                <input type="number">
            </div>

            <div class="input_group">
                <span>密码</span>
                <input type="password">
            </div>

            <div class="input_group">
                <span>优惠代码</span>
                <input type="text" placeholder="请输入（0）个尚未领取">
            </div>

            <div class="btn">确认支付</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "cardRecharge",
    data(){
        return{
            srcRec: require('../../assets/icons/icon-card2.png'),
            howMuch:[
                {num:100},
                {num:200},
                {num:500},
                {num:200},
            ],
            selectIndex:null
        }
    },
    methods:{
        isSelect(index){
            this.selectIndex = index;
        }
    }
}
</script>
