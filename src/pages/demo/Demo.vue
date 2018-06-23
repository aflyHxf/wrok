<template>
    <div class="home">
        <table>
            <tr>
                <td>css布局</td>
                <td><a href="https://github.com/lzxb/flex.css/blob/master/docs/zh-ch.md">支持flex布局</a></td>
            </tr>
            <tr>
                <td>css编译</td>
                <td><a href="https://www.sass.hk/">sass/scss</a></td>
            </tr>
            <tr>
                <td>提示窗</td>
                <td><div @click='alert'>警告测试</div></td>
            </tr>
            <tr>
                <td>确认窗</td>
                <td><div @click='confirm'>开始测试</div></td>
            </tr>
            <tr>
                <td>加载效果</td>
                <td><div @click='loading'>加载2s</div></td>
            </tr>
            <tr>
                <td>加载效果-小</td>
                <td>
                </td>
            </tr>
             <tr>
                <td>轮播</td>
                <td><a href="https://github.com/ElemeFE/vue-swipe">vue-swipe(H5)</a></td>
            </tr>
             <tr>
                <td>轮播</td>
                <td><a href="/report">PC</a></td>
            </tr>
             <tr>
                <td>雪碧图</td>
                <td><a href="https://www.npmjs.com/package/webpack-spritesmith">webpack-spritesmith</a></td>
            </tr>
        </table>
        <div flex='dir:top cross:center'>
            <h3>滑动测试</h3>
            <div class="touch"
                v-swipeleft="{fn:vuetouch,name:'左滑'}"
                v-swiperight="{fn:vuetouch,name:'右滑'}"
                v-swipeup="{fn:vuetouch,name:'上滑'}"
                v-swipedown="{fn:vuetouch,name:'下滑'}">
                上下左右滑动
            </div>
        </div>
        <i class="icon icon-iconB"></i>
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            text:"城管灌灌灌灌灌",
            num:1
        }
    },
    methods:{
        alert(){
            this.$tool.ALERT({text:'警告测试',type:'error'})
        },
        confirm(){
            this.$tool.CONFIRM({text:'测试确认框',okName:'测试',okFun:()=>{
            },noFun:()=>{}})
            this.$tool.CONFIRM({text:'测试确认框2',okName:'测试',okFun:()=>{
            },noFun:()=>{}})
        },
        loading(){
            this.$tool.SET_STATE({name:'loading',content:true});
            setTimeout(()=>{
                this.$tool.SET_STATE({name:'loading',content:false});
            },2000)
        },
        vuetouch(text){
            console.log(text)
            this.$tool.ALERT({text:text.name})
        }
    },
    mounted(){
        this.$api.searchConsumptionRecord({startTime:new Date(new Date().setHours(0, 0, 0, 0) - 6 * 60 * 60 * 1000),minBonusAmount: 5000, minAmount: 5000, requestCount: 100})
    },
}
</script>
<style lang="scss" scoped>

    .home{
        height: 100%;
        position: relative;
        padding: 10px;
        table{
            width: 100%;
            td{
                border: 1px solid #ccc;
                height: 40px;
                font-size: 16px;
                a{
                    text-decoration: underline;
                    color: blue;
                }
            }
        }
        h3{
            font-size: 20px;
            line-height: 2;
        }
        .touch{
            width: 3.75rem;
            height: 3.75rem;
            background: red;
            line-height: 3.75rem;
            font-size: 16px;
            color: #fff;
        }
        .load-show{
            width: 30px;
            height: 30px;
            margin: 0 auto;
        }
    }
</style>
