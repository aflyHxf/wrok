<template>
    <div>
        <router-link :to="path" class="c_tag" flex="cross:center">
            <img :class="title=='在线充值' ? 'log0':(title=='修改密码'? 'log1':'log')" :src="logSrc" alt="">
            <span>{{title}}</span>
            <img class="arrow" :src="srcArrow" alt="">
        </router-link>
    </div>
</template>

<script>
export default {
    name: "selectArrow",
    props: {
        path: String,
        title: String,
        logSrc: String,
    },
    data(){
        return{
            srcArrow: require('../assets/icons/icon-arrowRight.png')
        }
    }
}
</script>

<style scoped lang="scss">
    .c_tag {
        width: 100%;
        height: 0.88rem;
        position: relative;
        color: #141414;
        font-weight: bold;
        background-color: #fff;
        border-bottom: 1px solid #b3b4b6;
        border-top: 1px solid #b3b4b6;
        margin-bottom: 0.3rem;
        img.log {
            width: 0.56rem;
            height: 0.56rem;
            margin: 0 0.4rem 0 0.3rem;
        }

        img.log0 {
            width: 0.56rem;
            margin: 0 0.4rem 0 0.3rem;
            height: 0.4rem;
        }

        img.log1 {
            width: 0.48rem;
            margin: 0 0.4rem 0 0.3rem;
            height: 0.5rem;
        }

        span {
            color: #141414;
            font-weight: bold;
            font-size: 0.34rem;
        }

        img.arrow {
            width: 0.26rem;
            height: 0.42rem;
            position: absolute;
            top: 0;
            right: 0.2rem;
            bottom: 0;
            margin: auto;
        }
    }

</style>
