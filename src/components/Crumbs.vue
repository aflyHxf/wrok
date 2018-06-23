<template>
    <div>
        <div class="crumbs2" v-if="noBack == true">
            <div class="title">
                <div class="text" flex="main:center cross:center">
                    <img :src="src"><span>{{title}}</span>
                </div>
            </div>
        </div>
        <div class="crumbs" v-else>
            <div class="back">
                <div class="logo" flex="main:center cross:center"  flex-box="3">
                    <img :src="platform.icon" alt="logo">
                </div>
                <div class="text" @click="backPath? $rouer.push({path:backPath}):$router.go(-1)">{{backName}}</div>
            </div>
            <div class="title">
                <div class="text" flex="main:center cross:center">
                    <img :src="src"><span>{{title}}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

/*
*   crumbs面包屑导航
*{
    example
        let iconSrc = '../assets/icons/icon_register.png'
        let title = '创建新用户'
        let backName="首页"
        let backPath="/home“
        // noback 为true 则没有返回的html部分
        <crumbs src=iconSrc title=title backName=backName backPath=backPath></crumbs>
}
*@param {String} 字符串iconSrc 图标路径
*@param {String} 字符串backName  (默认==>'返回')
*@param {String} 字符串title  当前页title
*@param {String} 字符串backPath  (默认==>返回上一页)
*
*hank 2018.6.3
*
*/
import {mapActions,mapState} from 'vuex'
export default {
    name: 'crumbs',
    data () {
        return {
        }
    },
    props:{
        src: String,
        title:String,
        backPath:String,
        backName:{
            type:String,
            default:'返回'
        },
        noBack:Boolean
    },
    methods:{
    },
    mounted(){
    },
    computed:{
        ...mapState(['platform','player','cf'])
    }
}
</script>
<style lang="scss">
    $url:"../assets/icons/";
    .crumbs{
        width: 100%;
        height: 2.43rem;
        position: relative;
        .back{
            height: 1rem;
            padding:0 0.1rem;
            position: relative;
            background-image: linear-gradient(top,#5b5b5b,#151515);
            z-index: 100;
            .logo{
                height: 100%;
                img{
                    height: 0.9rem;
                }
            }
            .text{
                padding-left: 0.75rem;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                background: url($url+"icon_arrorLeft.png") no-repeat 0.28rem center;
                background-size: auto 0.48rem;
                color: #fff;
                line-height: 1rem;
                font-size: 0.28rem;
            }
        }
        .title{
            width: 100%;
            height:1.43rem;
            line-height:1.43rem;
            position: relative;
            text-align: center;
            background-image: linear-gradient(top, #f3f4f5, #f3f4f5, #f3e8bb);
            background-image: -webkit-linear-gradient(top, #f3f4f5, #f3f4f5, #f3e8bb);
            font-size: 0.34rem;
            font-weight: bold;
            &:before,&:after{
                content: "";
                position: absolute;
                width: 100%;
                left: 0;
                height: 0.08rem;
                box-shadow: 1px 2px 2px 0 rgba(0,0,0,0.8);
                background-image: linear-gradient(left, #a16026, #f8c572, #f8c572, #f8c572, #a26227);
                background-image: -webkit-linear-gradient(left, #a16026, #f8c572, #f8c572, #f8c572, #a26227);
            }
            &:after{
                bottom: 0;
            }
            img{
                height: 1rem;
                margin-right:0.18rem;
            }
        }
    }
    .crumbs2{
        height: 1.442rem;
        .title{
            width: 100%;
            height:1.43rem;
            line-height:1.43rem;
            position: relative;
            text-align: center;
            background-image: linear-gradient(top, #f3f4f5, #f3f4f5, #f3e8bb);
            background-image: -webkit-linear-gradient(top, #f3f4f5, #f3f4f5, #f3e8bb);
            font-size: 0.34rem;
            font-weight: bold;
            &:before,&:after{
                content: "";
                position: absolute;
                width: 100%;
                left: 0;
                height: 0.08rem;
                box-shadow: 1px 2px 2px 0 rgba(0,0,0,0.8);
                background-image: linear-gradient(left, #a16026, #f8c572, #f8c572, #f8c572, #a26227);
                background-image: -webkit-linear-gradient(left, #a16026, #f8c572, #f8c572, #f8c572, #a26227);
            }
            &:after{
                bottom: 0;
            }
            img{
                height: 1rem;
                margin-right:0.18rem;
            }
        }
    }
</style>
