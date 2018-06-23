<template>
    <div class="lobby">
        <crumbs  title="大厅" :src="srcDt" :noBack="noB"></crumbs>
        <TagList :gameData="gameList"></TagList>
        <ul class="c_contentList">
            <li v-for="(item,index) in playList" :key="index" @click="changeGameList(index)">
                <img src="" alt="">
                <img class="arrow" :src="srcArrow" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import TagList from '../../components/tagList'
export default {
    name: 'register',
    data() {
        return {
            srcArrow: require('../../assets/icons/icon-arrowUp.png'),
            srcDt: require('../../assets/icons/on .icon-nav1.png'),
            gameList:[
                {name:'真人',on:'icon_gameType0',off:'icon_gameType0_b'},
                {name:'体育',on:'icon_gameType1',off:'icon_gameType1_b'},
                {name:'电子',on:'icon_gameType2',off:'icon_gameType2_b'},
                {name:'彩票',on:'icon_gameType3',off:'icon_gameType3_b'},
            ],
            playList:[
                {name:'真人'},
                {name:'体育'},
                {name:'电子'},
                {name:'彩票'},
            ],
            selectedIndex:0,
            noB:true
        }
    },
    methods: {

    },
    components:{
        TagList
    }
}
</script>
<style lang="scss" scoped>

</style>
