<template>
    <div class="gameTransfer">
        <crumbs  title="游戏转账" :src="src"></crumbs>
        <div class="form_box">
            <h5>游戏额度转入</h5>
            <div class="item disable">
                <label  flex="cross:center box:first">
                    <div class="name">本地额度</div>
                    <span class="red">0.00</span>
                </label>
            </div>

            <div class="item">
                <label  flex="cross:center box:first">
                    <div class="name">转入游戏</div>
                    <select>
                        <option value="">AG大厅</option>
                    </select>
                </label>
            </div>

            <div class="btn disable">转入</div>

            <h5 class="top">游戏额度转出</h5>
            <GameTransfer :gameName="item.gameName" :gameStatus="item.gameStatus" :balance="item.balance" v-for="(item,index) in gameList" :key="index"></GameTransfer>
        </div>

    </div>
</template>

<script>
import GameTransfer from '../../components/gameTransfer';
export default {
    name: "gameTransfer",
    data(){
        return{
            src:require('../../assets/icons/icon-acc1.png'),
            gameList:[
                {gameName:'AG捕鱼',balance:100.0,gameStatus:'开启'},
                {gameName:'AG捕鱼',balance:100.0,gameStatus:'开启'},
                {gameName:'AG捕鱼',balance:100.0,gameStatus:'开启'},
                {gameName:'AG捕鱼',balance:100.0,gameStatus:'开启'},
            ]
        }
    },
    components:{
        GameTransfer
    }
}
</script>

<style scoped>

</style>
