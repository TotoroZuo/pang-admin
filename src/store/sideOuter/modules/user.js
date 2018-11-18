/*
 * @Author: Long maomao
 * @Date: 2018-09-10 13:17:32
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-09-14 15:30:55
 * @Email: zlf@zuolongfei.me
 *
 * @Description: 用户状态管理模块
 *
 */

export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    // 用户token 或者id
    token: '',
    // 当前选择用户信息
    selectInfo: {}
  },
  mutations: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set (state, info) {
      // store 赋值
      state.info = info
      state.token = info.token
      sessionStorage.setItem('token', info.token)
      sessionStorage.setItem('userInfo', JSON.stringify(info))
    },

    /**
     * [clear description] 退出登陆清除用户信息
     */
    clear (state) {
      state.token = ''
      state.info = {}
      state.selectInfo = {}
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userInfo')
    },
    /**
     * [refresh description] 持久化登陆状态（从本地存储拿取token和userInfo）
     */
    refresh (state) {
      if (!state.token && sessionStorage.getItem('token')) {
        state.token = sessionStorage.getItem('token')
        state.info = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
      }
    }

  }
}
