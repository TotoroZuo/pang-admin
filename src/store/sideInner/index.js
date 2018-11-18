import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user' // 用户管理
import menu from './modules/menu' // 菜单管理
import setting from './modules/setting' // 设置管理

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    user,
    menu,
    setting
  }
})
