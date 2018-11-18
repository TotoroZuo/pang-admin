/*
 * @Author: Long maomao
 * @Date: 2018-09-14 15:25:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-18 02:59:18
 * @Description: 菜单管理接口
 * @Email: zlf@zuolongfei.me
 */

import $request from '@/libs/http.js' // 导入http请求方法

/**
 * @description 获取用户菜单列表接口
 * @param  {String} options.userName 用户名
 * @param  {String} options.password 用户密码
 * @return {Object} 接口返回数据
 */
const getList = () => {
  const url = '/admin/menu/getMenus'
  return $request.post(url, {})
}

/**
 * @description 获取所有菜单列表
 */
const getAllList = options => {
  const url = '/menu/getAllList'

  return $request.post(url, {})
}

export default {
  getList,
  getAllList
}
