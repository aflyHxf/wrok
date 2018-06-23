<template>
    <div>
        <ul class="c_tagList">
            <li v-for="(item,index) in gameData" :key="index" @click="isSelected(index,item.name)" :class="selectedIndex == index ? 'on' :''">
                <div :class="selectedIndex == index ? item.on:item.off"></div>
                <p>{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "tagList",
    data(){
        return{
            selectedIndex:0
        }
    },
    methods:{
        isSelected(index,name){
            this.selectedIndex = index;
            this.$emit('change-name',name)
        },
    },
    props:{
        gameData:Array
    }
}
</script>

<style scoped lang="scss">
    .c_tagList{
        width: 100%;
        height: 0.94rem;
        line-height: 0.94rem;
        display: flex;
        flex-direction: row;
        li{
            flex: 1;
            border-bottom: 1px solid #b3b4b6;
            text-align: center;
            background-image: -webkit-linear-gradient(top, #ffffff, #c9c9c9);
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            div{
                width: 0.54rem;
                height: 0.54rem;
                margin-right: 0.16rem;
            }

            div.icon_gameType0{
                background: url("../assets/icons/icon-gameType0.png") no-repeat;
                background-size:100% 100%;
            }

            div.icon_gameType0_b{
                background: url("../assets/icons/icon-gameType0_b.png") no-repeat;
                background-size:100% 100%;
            }
            div.icon_gameType1{
                background: url("../assets/icons/icon-gameType1.png") no-repeat;
                background-size:100% 100%;
            }

            div.icon_gameType1_b{
                background: url("../assets/icons/icon-gameType1_b.png") no-repeat;
                background-size:100% 100%;
            }
            div.icon_gameType2{
                background: url("../assets/icons/icon-gameType2.png") no-repeat;
                background-size:100% 100%;
            }

            div.icon_gameType2_b{
                background: url("../assets/icons/icon-gameType2_b.png") no-repeat;
                background-size:100% 100%;
            }
            div.icon_gameType3{
                background: url("../assets/icons/icon-gameType3.png") no-repeat;
                background-size:100% 100%;
            }

            div.icon_gameType3_b{
                background: url("../assets/icons/icon-gameType3_b.png") no-repeat;
                background-size:100% 100%;
            }

            div.icon_record0{
                background: url("../assets/icons/icon-record0.png") no-repeat;
                background-size:100% 100%;
            }
            div.icon_record0_b{
                background: url("../assets/icons/icon-record0_b.png") no-repeat;
                background-size:100% 100%;
            }

            div.icon_record1{
                background: url("../assets/icons/icon-record1.png") no-repeat;
                background-size:100% 100%;
            }
            div.icon_record1_b{
                background: url("../assets/icons/icon-record1_b.png") no-repeat;
                background-size:100% 100%;
            }

            div.icon_record2{
                background: url("../assets/icons/icon-record2.png") no-repeat;
                background-size:100% 100%;
            }
            div.icon_record2_b{
                background: url("../assets/icons/icon-record2_b.png") no-repeat;
                background-size:100% 100%;
            }

            p{
                color: #898989;
                font-size: 0.26rem;
            }
        }
        li.on{
            background: none;
            border-bottom: 0;
        }
        li:before{
            content: "";
            width: 1px;
            height: 100%;
            background: #b8b8b8;
            position: absolute;
            top: 0;
            right: 0;
        }
        li:last-child:before{
            width: 0;
        }
    }
</style>
