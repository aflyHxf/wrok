<template>
    <div class="activity-container">
        <header-nav></header-nav>
        <ul class="activity-list">
                <li v-for="(item,index) in rewardList"
                    :key="index"
                    :class="{'show-text':tagIndex !== index}">
                    <img v-if="item.condition.imageUrl" :src="item.condition.imageUrl[0]" alt="" @click.stop="openDetail(index)">
                    <div class="content"
                         v-for="itemText in item.list">
                        <div v-html="itemText.displayTextContent"></div>
                    </div>
                </li>
        </ul>
    </div>
</template>

<script>
import HeaderNav from 'components/Header'
export default {
    data() {
        return {
            rewardList:[],
            tagIndex:'',
        }
    },
    created() {
        this.$api.getRewardList().then(res=>{
            console.log(res.data)
            this.rewardList = res.data.slice(0,3)
        })
    },
    methods: {
        openDetail(index){
            if(this.tagIndex === index){
                this.tagIndex = ''
            }else {
                this.tagIndex = index
            }
        }
    },
    components: {
        HeaderNav
    }
}
</script>

<style scoped lang="scss">
    .activity-container {
        width: 100%;
        height: 100%;
        padding-top: 1rem;
        .activity-list {
            width: 100%;
            overflow: hidden;
            li{
                overflow: hidden;
                transition: all 1s;
            }
            img{
                display: block;
                width: 100%;
                height: 2.2rem;
            }
            .text {
                height:1rem;
                line-height: 1rem;
                padding: 0 .2rem 0 .3rem;
                background-color: #fff;
                overflow: hidden;
                .button{
                    float: right;
                    width: 1.44rem;
                    height: .8rem;
                    line-height: .8rem;
                    margin-top: 0.1rem;
                    text-align: center;
                    color: #fff;
                    border-radius: .08rem;
                    background-color: #1e8feb;
                }
            }
            .content{
                padding-bottom:0.2rem;
                transition: all .3s;
                overflow: hidden;
            }
            .show-text{
                height: 2.2rem !important;
            }
        }
    }
</style>
