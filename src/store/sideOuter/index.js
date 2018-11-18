import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user' // 用户管理
import menu from './modules/menu' // 菜单管理
import setting from './modules/setting' // 设置管理
import options from './modules/options' // 操作数据状态
import ua from './modules/ua' // 浏览器信息
Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    user,
    menu,
    setting,
    options,
    ua
  }
})
