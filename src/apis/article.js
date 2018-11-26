/*
 * @Author: Long maomao
 * @Date: 2018-09-10 19:08:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-26 23:08:22
 * @Description: 用户模块接口
 * @Email: zlf@zuolongfei.me
 */

import $request from '@/libs/http.js' // 导入http请求方法

/**
 * @description 用户登录接口
 * @param  {String} options.userName 用户名
 * @param  {String} options.password 用户密码
 * @return {Object} 接口返回数据
 */
const addOrUpdateArticle = options => {
  const url = options.optionType == 'add' ? '/admin/article/addNewArticle' : '/admin/article/updateArticle'
  const params = {
    title: options.title,
    introduction: options.introduction,
    author: options.author,
    tag: JSON.stringify(options.tag),
    category: options.category,
    subPic: options.subPic,
    origin: options.origin,
    content: options.content,
    time: options.time,
    recommend: options.recommend,
    weight: options.weight,
    status: options.status
  }
  if (options.optionType != 'add') {
    params.aid = options.aid
  }
  return $request.post(url, params)
}

/**
 * @description 获取文章列表
 */
const getArticleList = options => {
  const url = '/admin/article/getArticleList'
  const params = {
    page: options.page,
    pageSize: options.pageSize
  }
  return $request.post(url, params)
}

/**
 * @description 修改文章状态
 * options.recommend // 修改推荐状态
 * options.isDel // 删除文章
 * options.status // 修改发布状态
 */
const updateArticleStatus = options => {
  const url = '/admin/article/updateArticleStatus'
  const params = { ...options }
  return $request.post(url, params)
}

/**
 * @description 编辑用户接口
 * @param  {String} options.uid 用户ID
 * @param  {String} options.account 用户名
 * @param  {String} options.password 用户密码
 * @param  {String} options.avator 头像
 * @param  {String} options.org 所属部门
 * @param  {Array}  options.role 角色
 * @param  {String} options.name  姓名
 * @param  {Boolean} options.enable 启用状态
 * @param  {String} options.phone 手机号
 * @param  {String} options.idcard 身份证号
 * @param  {Boolean} options.isSuper 是否拥有超级权限
 * @return {Object} 接口返回数据
 */

const editorUser = options => {
  const url = '/admin/user/editor'
  const params = {
    uid: options.uid,
    account: options.account,
    password: options.password,
    avator: options.avator,
    org: options.org,
    role: options.role.join(','),
    name: options.name,
    enable: Number(options.enable),
    phone: options.phone,
    idcard: options.idcard,
    isSuper: Number(options.isSuper)
  }
  return $request.post(url, params)
}

/**
 * @description 删除用户接口
 * @param  {String} options.uid 用户ID
 * @return {Object} 接口返回数据
 */

const delUser = options => {
  const url = '/admin/user/delUser'
  const params = {
    uid: options.uid
  }
  return $request.post(url, params)
}

/**
 * @description 禁用启用用户接口
 * @param  {String} options.uid 用户ID
 * @param  {Boolean} options.enable 用户ID
 * @return {Object} 接口返回数据
 */

const enableUser = options => {
  const url = '/admin/user/delUser'
  const params = {
    uid: options.uid,
    enable: Number(options.enable)
  }
  return $request.post(url, params)
}
export default {
  addOrUpdateArticle,
  getArticleList,
  updateArticleStatus,
  editorUser,
  delUser,
  enableUser
}
