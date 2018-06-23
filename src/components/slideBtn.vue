<template>
    <div class="slideBtn">
        <div class="a_box" v-for="(item,index) in smsData" :key="index" @click="changeStatus(item)">
            <span>{{item.content}}</span>
            <div class="slide" :class="item.status  ?'on':'off'"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "slideBtn",
    props:{
        smsData:Array
    },
    methods:{
        changeStatus(item){
            if(!item.status){
                item.status = 1
            }else {
                item.status = 0
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .slideBtn{
        margin-top: 0.6rem;
        .a_box{
            height: 0.88rem;
            margin-bottom: 0.3rem;
            color: #141414;
            background-color: #fff;
            border-bottom: 1px solid #b3b4b6;
            border-top: 1px solid #b3b4b6;
            span{
                float: left;
                line-height: 0.88rem;
                margin-left: 0.3rem;
                font-size: 0.34rem;
            }
            div.slide{
                float: right;
                margin: 0.17rem 0.2rem 0 0;
                width: 0.88rem;
                height: 0.54rem;
            }
            div.slide.on{
                background: url("../assets/icons/icon-radiobg.png") no-repeat;
                background-size: 100% 100%;
                position: relative;
            }
            div.slide.off{
                background: url("../assets/icons/icon-radiobg_b.png") no-repeat;
                background-size: 100% 100%;
                position: relative;
            }
            div.slide.off:after{
                content: "";
                width: 0.54rem;
                height: 0.54rem;
                background: #fff;
                border-radius: 50%;
                border: 1px solid #7b6c43;
                box-shadow: 1px 2px 3px 0 rgba(0,0,0,0.4);
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                background-image: linear-gradient(top, #fdfdfd, #d1d1d1);
                transition: all ease-in 0.2s;
            }
            div.slide.on:after{
                content: "";
                width: 0.54rem;
                height: 0.54rem;
                background: #fff;
                border-radius: 50%;
                border: 1px solid #7b6c43;
                box-shadow: 1px 2px 3px 0 rgba(0,0,0,0.4);
                position: absolute;
                left: 0.34rem;
                top: 0;
                bottom: 0;
                margin: auto;
                transition: all ease-in 0.2s;
                background-image: linear-gradient(top, #fdfdfd, #d1d1d1);
            }

        }
    }
</style>
