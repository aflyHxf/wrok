<template>
    <div class="swiper-text"
        @mouseover="move(0)"
        @mouseout="move(1)"
        :style="{width:option.width+'px',height:option.height+'px'}">
        <div
            class="swiper-wrapper"
            ref="wrapper"
            :class="option.effect || 'left'">
            <div class="sider" v-for="(item,index) in option.list" :key="index">
                {{item.text}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'swiper',
    data () {
        return {
            timer:null,
            x:0,
            option:{
                effect:'left',
                width:750,
                height:375,
                list:[
                    {text:"11111111111111111111111111111111111111111111111"},
                    {text:"222222222222222222222222222222222222"},
                    {text:"3333333333333333333333333333333333333333333333333"},
                    {text:"44444444444444444444444444444444444444444444"},
                    {text:"555555555555555555555555555555555555555555555"},
                    {text:"66666666666666666666666666666666666666"},
                    {text:"11111111111111111111111111111111111111111111111"},
                    {text:"222222222222222222222222222222222222"},
                    {text:"3333333333333333333333333333333333333333333333333"},
                    {text:"44444444444444444444444444444444444444444444"},
                    {text:"555555555555555555555555555555555555555555555"},
                    {text:"66666666666666666666666666666666666666"},
                ]
            }
        }
    },
    props:[],
    methods:{
    },
    mounted(){
    },
}
</script>
<style lang="scss" type="text/css">
    .swiper-text{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        border: 1px solid red;

        .left{
            animation: imgAnimation 10s linear infinite ; //infinite为无限循环，让轮播无止尽的循环下去
            div{
                line-height: 50px;
                white-space:nowrap;
            }
            .box-text{
                float: left;
            }
        }
        .left:hover{
            animation-play-state:paused; //通过伪元素控制鼠标的移入轮播图的变化，如果图片为a标签嵌套的话就可以实现不用js注册事件都可以点击的轮播图效果
        }
    }
    @keyframes imgAnimation{
        from{}
        to{
            transform:translate3d(0,-300px,0);//设置让动画每移动到添加之前的长度之后从新恢复到起始位置
        }
    }
</style>
