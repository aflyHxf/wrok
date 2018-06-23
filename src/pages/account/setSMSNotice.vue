<template>
    <div class="SMSNotice-container">
        <header-nav  :csLogo="false"
                     :title="title"></header-nav>
        <SlideBtn :smsData="smsData"></SlideBtn>
        <div class="btn" @click="submitChange">确认修改</div>
    </div>
</template>

<script>
import SlideBtn from  '../../components/slideBtn'
import HeaderNav from 'components/Header'
export default {
    data(){
        return{
            title:'短信设置',
            smsData:[
                {content:'修改资料',status:0},
                {content:'修改密码',status:0},
                {content:'优惠添加',status:0},
            ]
        }
    },
    created() {
        // 获取玩家的短信设置
        this.$api.getSmsStatus().then(res => {
            res.data.forEach(item=>{
                this.smsData.forEach(v=>{
                    if(item.smsName === v.content){
                        v.status = item.status
                        v.smsId = item.smsId
                    }
                })
            })
        })
    },
    methods:{
        submitChange() {
            let data = this.smsData.map(v => {
                return v.smsId+':'+ v.status
            })
            let status = (String(data));
            this.$api.setSmsStatus({status}).then(res=>{
                if (res.data){
                    this.$tool.ALERT({text: '修改成功', type: 'success'})
                }
            })
        }
    },
    components:{
        HeaderNav,
        SlideBtn
    }
}
</script>
<style scoped lang="scss">
    .SMSNotice-container{
        width: 100%;
        height: 100%;
        padding-top: 1rem;
        .btn{
            width: 90%;
            margin: 1rem auto;
        }
    }
</style>
