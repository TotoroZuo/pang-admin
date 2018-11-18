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
    // 当前选择用户信息
    selectUser: {},
    // 当前选择菜单信息
    selectMenu: {},
    // 当前选择api信息
    selectApi: {}
  },
  mutations: {

    /**
    * [setSelect description] 设置当前选中人员信息
    */
    setSelectUser (state, info) {
      state.selectUser = info
    },
    /**
    * [setSelect description] 设置当前选中人员信息
    */
    setSelectMenu (state, info) {
      state.selectMenu = info
    },
    /**
    * [setSelect description] 设置当前选中人员信息
    */
    setSelectApi (state, info) {
      state.selectApi = info
    }

  }
}
