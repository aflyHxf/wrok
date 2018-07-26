import * as types from './mutation-types'
/* eslint-disable */
export default {
  // 加载中....
  [types.SET_LOADING_STATUS](state, flag) {
    state.loading = flag
  },
  //用户信息
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_EMAIL_STATUS](state, flag) {
    state.emailMsg = flag
  }
}
