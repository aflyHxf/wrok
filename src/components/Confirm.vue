<template>
    <div class="confirm mask" @touchmove.prevent='1' v-if='confirm'>
        <div class="content" :class="{enter:show,leave:!show}">
            <h2>{{confirm.title || '温馨提示'}}</h2>
            <div class="text" v-html="confirm.text|| '请确认'"></div>
            <div class="btns" flex='box:mean'>
                <div class="btn" v-if='confirm.noFun' @click='execute(confirm.noFun)'>
                    {{confirm.noName ||'取消'}}
                </div>
                <div class="btn" @click='execute(confirm.okFun)'>{{confirm.okName ||'确定'}}</div>
            </div>
        </div>
    </div>
</template>

<script>
/*   confirm确认框
        *{
        example
        let title = '温馨提示'
        let text = '这是一个确认框'
        let okFun = ()=>{
        console.log("确认后执行")
        }
        let okName="执行"
        let noFun=()=>{
        console.log("取消关闭")
        }
        let noName="执行"
        let important=true
        this.$tool.CONFIRM({title:title,text:text,okFun:okFun,okName:okName,noFun:noFun,noName:noName,important:important});
        }
        *@param {String} 字符串title (默认==>'温馨提示')
        *@param {String} 字符串text  (默认==>'请确认')
        *@param {String} 字符串okName  (默认==>'确认')
        *@param {String} 字符串noName  (默认==>'取消')
        *@param {Boolean} 布尔值important  (默认==>false,当为true的时候表示很重要，如果之前有弹窗会清除之前的并替换)
        *@param {Function}  点击okName 执行的函数okFun(默认==>null)
        *@param {Function}  点击noName 执行的函数noFun(默认==>null)
        *
        *hank 2018.4.18
        *
        */

import {mapState} from 'vuex';

export default {
    data() {
        return {
            show: true
        }
    },
    methods: {
        execute(fun) {
            this.show = false;
            setTimeout(() => {
                this.$tool.SET_STATE({name: 'confirm', content: null});
                fun && fun();
            }, 300);
        }
    },
    computed: {
        ...mapState(['confirm'])
    },
    watch: {
        confirm() {
            if (this.confirm) this.show = true;
        }
    }
};
</script>
<style lang="scss" scoped>
    .confirm {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        .content {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 250px;
            height: 150px;
            opacity: 0;
            text-align: center;
            border-radius: 10px;
            transition: all 0.3s;
            transform-origin: center center;
            background-color: #fff;
            z-index: 999;
            transform: translate3d(-50%, -50%, 0) scale(0.5);
            animation: amt-modal-in .3s ease-out;
            animation-fill-mode: forwards;
            overflow: hidden;
            h2 {
                height: 40px;
                font-size: 16px;
                line-height: 40px;
                font-weight: bold;
            }
            .text {
                font-size: 16px;
                padding: 10px 20px;
            }
            .btns {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                border-top: 1px solid #ccc;
                font-size: 16px;
                border-bottom-right-radius: 10px;
                overflow: hidden;
                .btn {
                    border: none;
                    border-right: 3px solid #ccc;
                    height: 100%;
                    line-height: 40px;
                    &:last-child {
                        border-right: none;
                    }
                }
            }
        }
        .enter {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes amt-modal-in {
        0% {
            transform: translate3d(-50%, -50%, 0) scale(0.5);
        }
        100% {
            transform: translate3d(-50%, -50%, 0) scale(1);
        }
    }

</style>
