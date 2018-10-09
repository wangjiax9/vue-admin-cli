import { logout, getUserInfo } from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    uid: '',
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const token = getToken()
        let uid = 0
        if (token) {
          uid = token.split('|')[0]
        } else {
          uid = 9527
        }
        getUserInfo(uid).then(response => {
          const data = response.data.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            // 默认为编辑
            data.roles = ['admin']
            commit('SET_ROLES', data.roles)
            // reject('getUserInfo: roles must be a non-null array !')
          }
          commit('SET_UID', data.id)
          commit('SET_NAME', data.nickname)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_UID', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_UID', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
