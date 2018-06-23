
<template>
    <div class="WashCodePreferential">
        <crumbs  title="提前结算洗码" :src="src"></crumbs>
        <div class="c_box">
            <table class="tab">
                <tbody>
                    <tr class="th">
                        <td></td>
                        <td>真人</td>
                        <td>电子</td>
                        <td>体育</td>
                        <td>彩票</td>
                    </tr>
                    <tr>
                        <td class="left" >VIP</td>
                        <td colspan="3">0.8%</td>
                        <td>1.2%</td>
                    </tr>
                    <tr>
                        <td class="left">钻石VIP</td>
                        <td colspan="3">1%</td>
                        <td>1.5%</td>
                    </tr>
                </tbody>
            </table>

            <p class="c_line">申请洗码的优惠金额必须大于或是等于100</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "WashCodePreferential",
    data(){
        return{
            src:require('../../assets/icons/icon-acc5.png'),
        }
    }
}
</script>

<style scoped lang="scss">
    .c_box{
        margin: 0.6rem 0.16rem 0 0.16rem;
        .tab{
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            background-color: #fff;
            font-size: 0.34rem;
            text-align: center;
            tr.th{
                background: #5a5a5a;
                font-weight: bold;
                td{
                    color: #fff;
                }
            }
            td{
                border: 1px solid #414141;
                color: #000;
                height: 0.88rem;
            }
            td.left{
                text-align: left;
                font-weight: bold;
                background-color: #e6e8eb;
                padding-left: 0.34rem;
            }
        }
        p.c_line{
            font-size: 0.24rem;
            padding-top: 0.1rem;
        }
    }
</style>

