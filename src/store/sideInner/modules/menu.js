// 设置文件
// import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    open: false, // 是否打开
    model: 'desk' // 哪种模式 desk 为桌面模式， mobile 为小屏模式
  },
  mutations: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    toggleOpen (state) {
      state.open = !state.open
    }
  }
}
