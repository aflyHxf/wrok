<template>
    <div class="inbox-container">
        <header-nav :title="title" :csLogo="false"></header-nav>
        <ul class="news-list">
            <li v-for="(item,index) in newsList"
                :key="index"
                @click="checkNews(item,index)"
                :class="{'active':tagIndex === index}"
               >
                <div class="title">{{item.title}}
                    <i class="unread" v-if="!item.hasBeenRead"></i>
                </div>
                <div class="content">
                    <div class="header">尊贵的会员：</div>
                    <div class="text">{{item.content}}</div>
                    <div class="create-time">创建时间：{{item.date | dateChange}}</div>
                </div>
            </li>
        </ul>
        <div class="tips" v-if="!newsList.length">邮箱为空</div>
    </div>
</template>

<script>
import HeaderNav from 'components/Header'
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            title:'站内信',
            newsList:[],
            tagIndex:-1
        }
    },
    computed:{
        ...mapGetters([
            'userInfo'
        ])
    },
    created(){
        this.$api.getMailList().then(res=>{
            this.newsList = res.data
        })
    },
    methods:{
        checkNews(item,index){
            if( this.tagIndex === index){
                this.tagIndex = ''
            }else {
                this.tagIndex = index
            }
            //读取站内信
            let {playerId} = this.userInfo;
            let mailObjId = item._id
            this.$api.readMail({playerId,mailObjId}).then(res=>{
                item.hasBeenRead = res.data.hasBeenRead
            })
        }
    },
    components:{
        HeaderNav
    }

}
</script>

<style scoped lang="scss">
.inbox-container{
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    .news-list{
        width: 100%;
        overflow: hidden;
        background-color: #fff;
        li {
            width: 100%;
            padding: 0 .2rem;
            height: 1rem;
            border-bottom: 1px solid #ccc;
            overflow: hidden;
            transition: all .3s;
            .title{
                position: relative;
                height: 1rem;
                line-height: 1rem;
                font-size: 18px;
                .unread{
                    position: absolute;
                    top: 50%;
                    right: 0.2rem;
                    width: 0.3rem;
                    height: 0.3rem;
                    border-radius: 50%;
                    background-color: #f00;
                    transform: translateY(-50%);
                }
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
            height: 4rem!important;
        }
    }
    .tips{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        font-size: 18px;
        background: #fff;
        text-align: center;
    }
}
</style>
