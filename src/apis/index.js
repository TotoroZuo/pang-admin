/*
 * @Author: Long maomao
 * @Date: 2018-09-10 18:15:48
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-09-10 19:05:59
 * @Description: 遍历文件，对接口模块化
 * @Email: zlf@zuolongfei.me
 */

const files = require.context('.', false, /\.js$/) // 当前文件夹js文件
const modules = {} // api模块对象
/**
 * 遍历当前文件夹问价对api模块化，每个文件名为模块名称
 */
files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

/**
 * 封装成vue插件
 * @description Vue.use()使用插件
 */
const install = Vue => {
  if (install.installed) return
  install.installed = true

  Object.defineProperties(Vue.prototype, {
    // 注意哦，此处挂载在 Vue 原型的 $api 对象上
    $apis: {
      get () {
        return modules
      }
    }
  })
}

export default install
