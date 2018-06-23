import * as types from './mutation-types'
import {Tool} from 'tool/index.js';
/* eslint-disable */
export default {
    [types.SET_STATE](state, {name, content, sub}) {
        sub ? state[name][sub] = content : state[name] = content;
    },
    [types.ALERT](state, data) {
        data.show = true;
        state.alert.push(data);
        setTimeout(() => {
            state.alert.remove(data)
        }, 2000)
    },
    [types.CONFIRM](state, data) {
        if (!state.confirm) {
            state.confirm = data;
        } else if (state.confirm && data.important) {
            state.confirm = null;
            setTimeout(() => {
                state.confirm = data;
            }, 200)
        }
    },
    [types.REGISTER](state, data = true) {
        state.mask = data;
        state.registerShow = data;
    },

    //用户登录，设置登录信息
    [types.LOGOUT](state, data) {
        state.user = data;
        state.resetArray.map((item, index) => {
            if (item == 'wallet') {
                state[item] = {}
            } else {
                state[item] = null
            }
        })
    },

    //用户信息
    [types.SET_USER_INFO](state, userInfo) {
        state.userInfo = userInfo
    },

}
