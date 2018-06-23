<template>
    <div class="submitDeposit">
        <crumbs  title="现金充值" :src="srcRec"></crumbs>

        <div class="form_box">
            <div class="item">
                <label  flex="cross:center box:first">
                    <div class="name">付款方式</div>
                    <select ng-model="">
                        <option value=""></option>
                        <option v-for="(item,index) in payList" :key="index" :value="item.value">{{item.content}}</option>
                    </select>
                </label>
            </div>

            <div class="item">
                <label  flex="cross:center box:first">
                    <div class="name">收款银行</div>
                    <select ng-model="">
                        <option value=""></option>
                        <option v-for="(item,index) in payList" :key="index" :value="item.value">{{item.content}}</option>
                    </select>
                </label>
            </div>

            <div class="item">
                <label   flex="cross:center box:first">
                    <div class="name">收款账号</div>
                    <input type="text"  placeholder="账号后三位/Email前三位">
                </label>
            </div>

            <div class="item">
                <label   flex="cross:center box:first">
                    <div class="name">姓名</div>
                    <input type="text"  placeholder="存款人姓名">
                </label>
            </div>

            <h5>存款地点</h5>
            <div class="item">
                <select>
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                </select>
            </div>

            <div class="item">
                <select>
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                </select>
            </div>

            <div class="item">
                <select>
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                </select>
            </div>

            <h5 :style="{opacity:0}">...........</h5>

            <div class="item time">
                <label>
                    <div class="name">时间</div>
                    <input type="date" :value="nowDates[0]" ref="boxx">
                    <select v-model="nowDates[1]">
                        <option v-for="(item,index) in hours" :value="item" :key="index">{{item}}</option>
                    </select>

                    <select v-model="nowDates[2]">
                        <option v-for="(item,index) in minutes" :value="item" :key="index">{{item}}</option>
                    </select>
                </label>
            </div>

            <div class="item">
                <label   flex="cross:center box:first">
                    <div class="name">存款金额</div>
                    <input type="text"  placeholder="存款金额">
                </label>
            </div>

            <div class="item">
                <label   flex="cross:center box:first">
                    <div class="name">备注</div>
                    <input type="text"  placeholder="请输入">
                </label>
            </div>

            <div class="item disable">
                <label   flex="cross:center box:first">
                    <div class="name">优惠代码</div>
                    <input type="text"  placeholder="请输入（0）个尚未领取">
                </label>
            </div>

            <div class="btn">提交申请</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "submitDeposit",
    data(){
        return{
            srcRec: require('../../assets/icons/icon-submitDeposit.png'),
            payList:[
                {value:'1',content:'电话转账'},
                {value:'1',content:'电话转账'},
                {value:'1',content:'电话转账'},
                {value:'1',content:'电话转账'},
            ],
            hours:this.$tool.getArr(24),
            minutes:this.$tool.getArr(60),
            nowDates:this.$tool.nowDate()
        }
    }
}
</script>
