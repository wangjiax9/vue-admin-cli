import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.roles.length === 0) {
    store.dispatch('GetUserInfo').then(res => { // 拉取用户信息
      next()
    })
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.querySelector('title').innerText = `${to.meta.title}|游品位`
  NProgress.done() // 结束Progress
})
