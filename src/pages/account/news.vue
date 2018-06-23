<template>
    <div class="news-container">
        <header-nav :title="title" :csLogo="false"></header-nav>
        <ul class="news-list">
            <li v-for="(item,index) in newsList"
                :key="index"
                :class="{'active':tagIndex === index}"
                @click="checkNews(item,index)">
                <div class="title">{{item.title}}</div>
                <div class="content">
                    <div class="header">尊贵的会员：</div>
                    <div class="text">{{item.content}}</div>
                    <div class="create-time">创建时间：{{item.date | dateChange}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import HeaderNav from 'components/Header'
export default {
    data () {
        return {
            title:'最新消息',
            newsList:[],
            tagIndex:''
        }
    },
    created() {
        this.$api.getPlatformAnnouncements().then(res => {
            this.newsList = res.data
        })
    },
    methods:{
        checkNews(item, index) {
            if(this.tagIndex === index){
                this.tagIndex = ''
            }else {
                this.tagIndex = index
            }
        }
    },
    components:{
        HeaderNav
    }

}
</script>

<style scoped lang="scss">
.news-container{
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    background-color: #fff;
    .news-list{
        width: 100%;
        overflow: hidden;
        background-color: #fff;
        li {
            width: 100%;
            padding: 0 .2rem .2rem;
            height: 1rem;
            border-bottom: 1px solid #ccc;
            overflow: hidden;
            transition: all .3s;
            .title{
                position: relative;
                height: 1rem;
                line-height: 1rem;
                padding-left: 0.3rem;
                font-size: 18px;
            }
            .content{
                position: relative;
                width: 100%;
                height: 2.8rem;
                padding: 0.2rem;
                background: #f5f5f5;
                .header{
                    font-size: 16px;
                    font-weight: bold;
                }
                .text{
                    font-size: 16px;
                    padding: 0.2rem;
                }
                .create-time{
                    position: absolute;
                    font-size: 12px;
                    right: 0.2rem;
                    bottom: 0.2rem;
                }
            }
        }
        .active{
            height: 4rem !important;
        }
    }
}
</style>
