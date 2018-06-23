<template>
    <div>
        <div class="c_table">
            <p><span>当前游戏名称</span><span>{{gameName}}</span></p>
            <p><span>当前游戏状态</span><span :class="gameStatus == '开启'?'green':''">{{gameStatus}}</span></p>
            <p><span>当前游戏额度</span><span>{{balance}}</span></p>

            <button>转出</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "gameTransfer",
    props:{
        gameName:String,
        gameStatus:String,
        balance:Number
    }
}
</script>

<style scoped lang="scss">
    .c_table{
        width: 100%;
        height: 2.4rem;
        border: 1px solid #7d7e7f;
        border-radius: 0.1rem;
        margin-bottom: 0.32rem;
        padding: 0.2rem;
        position: relative;
        p{
            width: 100%;
            overflow: hidden;
            color: #141414;
            font-size: 0.24rem;
            font-weight: normal;
            span:first-child{
                float: left;
            }
            span:last-child{
                float: right;
            }
        }
        button{
            width: 40%;
            background: #c7c8cb;
            font-size: 0.26rem;
            height: 0.52rem;
            color: #fff;
            border-color: #7d7e7f;
            position: absolute;
            left: 0;right: 0;
            bottom: 0.2rem;
            margin: auto;
            border-radius: 0.1rem;
            font-weight: bold;
        }

        .green{
            color: #03ac4a;
        }
        .red{
            color: #cf0707;
        }
        .gray{
            color: gray;
        }
    }
</style>
