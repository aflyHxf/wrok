import Vue from 'vue'
import * as types from './mutation-types'

//用户登出
export const setLogout = function({commit, state},fun){
    Vue.prototype.$api.logout({
        playerId: state.userInfo.playerId
    }).then(() => {
        //清空 session
        Vue.prototype.$tool.removeSession('userInfo')
        //清空state的userInfo
        commit(types.SET_USER_INFO,{})
        fun && fun();
    })
}




