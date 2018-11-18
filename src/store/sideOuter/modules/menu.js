/*
 * @Author: Long maomao
 * @Date: 2018-09-14 12:03:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-18 01:02:25
 * @Description: 菜单状态管理模块
 * @Email: zlf@zuolongfei.me
 */

export default {
  namespaced: true,
  state: {
    open: true, // 是否打开
    active: '', // 当前菜单
    menuList: null // 所有菜单列表
  },
  mutations: {
    /**
     * @description 设置菜单打开还是收起
     * @param {Object} state vuex state
     */
    toggleOpen (state) {
      state.open = !state.open
    },
    /**
     * [setList description] 设置菜单数据
     * @param {Object} state vuex state
     * @param {Array} list 菜单数据
     */
    setList (state, list) {
      state.menuList = list
    },
    /**
     * [setList description] 设置当前激活菜单
     * @param {Object} state vuex state
     * @param {String} cur 当前激活菜单
     */
    setActive (state, cur) {
      state.active = cur
    }
  }
}
