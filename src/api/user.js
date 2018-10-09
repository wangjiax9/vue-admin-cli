import request from '@/utils/request'

// 登录专用
export function getUserInfo(uid) {
  return request({
    url: '/new/users/' + uid,
    method: 'get'
  })
}

// yotoo用户
export function getYotooUserInfo(uid) {
  return request({
    url: '/wechat/yotoo/user/' + uid,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/wechat/yotoo/logout',
    method: 'get'
  })
}

export function fetchUserList(query) {
  return request({
    url: '/wechat/yotoo/user',
    method: 'get',
    params: query
  })
}

export function getUserDetail(uid) {
  return request({
    url: `/wechat/yotoo/user/${uid}`,
    method: 'get'
  })
}

export function updateUser(uid, params) {
  return request({
    url: `/wechat/yotoo/user/${uid}`,
    method: 'post',
    data: JSON.stringify(params)
  })
}

export function createUser(params) {
  return request({
    url: `/wechat/yotoo/user`,
    method: 'post',
    data: JSON.stringify(params)
  })
}

export function getBindUserList() {
  return request({
    url: '/wechat/yotoo/user/bind',
    method: 'get'
  })
}

export function bindUser(uid) {
  return request({
    url: '/wechat/yotoo/user/bind',
    method: 'post',
    data: JSON.stringify({
      uid: uid
    })
  })
}

