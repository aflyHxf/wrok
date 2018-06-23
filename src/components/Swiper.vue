<template>
    <div class="swiper"
        @mouseover="move(0)"
        @mouseout="move(1)"
        :style="{width:option.width+'px',height:option.height+'px'}">
        <div
            class="swiper-wrapper"
            ref="wrapper"
            :class="option.effect || 'fade'">
            <img
                v-for="(item,index) in option.list"
                class="sider"
                :src="item.imgSrc"
                :style="{width:option.width+'px',height:option.height+'px'}"
                :class="{active:active == index}"
                :key="index" alt="轮播">
        </div>
        <div class="swiper-pagination" flex='main:center'>
            <div v-for="(item,index) in option.list" @click='active=index'  :class="{active:active == index}" :key="index"></div>
        </div>
    </div>
</template>

<script>

import banner1 from '@/assets/swiper/banner.jpg'
import banner2 from '@/assets/swiper/banner2.jpg'
import banner3 from '@/assets/swiper/banner3.jpg'
import banner4 from '@/assets/swiper/banner4.jpg'
export default {
    name: 'swiper',
    data () {
        return {
            active:0,
            timer:null,
            option:{
                effect:'fade',
                width:1200,
                height:500,
                list:[
                    {imgSrc:banner1},
                    {imgSrc:banner2},
                    {imgSrc:banner3},
                    {imgSrc:banner4},
                ]
            }
        }
    },
    props:[],
    methods:{
        move(open){
            if(open){
                this.timer = setInterval(()=>{
                    this.active++;
                    if(this.active>=this.option.list.length){
                        this.active=0;
                    }
                },2000)
            }else{
                clearInterval(this.timer);
            }
        },
        init(){
            this.move(1);
        }
    },
    mounted(){
        this.init()
    },
}
</script>
<style lang="scss" type="text/css">
    .swiper{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: red;
        position: relative;
        .swiper-wrapper{
            overflow:auto;
        }
        .fade{
            position: relative;
            width: 100%;
            height: 100%;
            .sider{
                position: absolute;
                left: 0;
                top: 0;
                transition: opacity 1s ease-in-out;
                opacity: 0;
            }
            .active{
                opacity: 1;
            }
        }
        .swiper-pagination{
            height: 20px;
            position: absolute;
            bottom: 0;
            width: 100%;
            div{
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: rgba(0,0,0,0.7);
                margin: 0 5px;
                cursor: pointer;
            }
            .active{
                background: #fff;
            }
        }
    }
</style>
