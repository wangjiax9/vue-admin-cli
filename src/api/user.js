import request from '@/utils/request'

export default {

  /**
   * 登录专用
   * @param uid
   */
  getUserInfo (uid) {
    return request({
      url: '/new/users/' + uid,
      method: 'get'
    })
  },

  /**
   * yotoo用户
   * @param uid
   */
  getYotooUserInfo (uid) {
    return request({
      url: '/wechat/yotoo/user/' + uid,
      method: 'get'
    })
  },

  /**
   * 退出登录
   */
  logout () {
    return request({
      url: '/wechat/yotoo/logout',
      method: 'get'
    })
  },

  /**
   * 获取用户列表
   * @param query
   */
  fetchUserList (query) {
    return request({
      url: '/wechat/yotoo/user',
      method: 'get',
      params: query
    })
  },

  /**
   * 获取用户详情
   * @param uid 用户ID
   */
  getUserDetail (uid) {
    return request({
      url: `/wechat/yotoo/user/${uid}`,
      method: 'get'
    })
  },

  /**
   * 更新用户
   * @param uid 用户ID
   * @param params 更新数据
   */
  updateUser (uid, params) {
    return request({
      url: `/wechat/yotoo/user/${uid}`,
      method: 'post',
      data: JSON.stringify(params)
    })
  },

  /**
   * 创建用户
   * @param params 用户数据
   */
  createUser (params) {
    return request({
      url: `/wechat/yotoo/user`,
      method: 'post',
      data: JSON.stringify(params)
    })
  },

  /**
   * 获取绑定的用户列表
   */
  getBindUserList () {
    return request({
      url: '/wechat/yotoo/user/bind',
      method: 'get'
    })
  },

  /**
   * 绑定用户
   * @param uid
   */
  bindUser (uid) {
    return request({
      url: '/wechat/yotoo/user/bind',
      method: 'post',
      data: JSON.stringify({
        uid: uid
      })
    })
  }
}
