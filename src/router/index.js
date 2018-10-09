import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/404', component: _import('errorpage/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard',
        noCache: true
      }
    }]
  },
  {
    path: '/parent1',
    component: Layout,
    redirect: '/parent1/child1',
    name: 'parent1',
    meta: {
      title: '测试父标签1',
      icon: 'ad'
    },
    children: [
      {
        path: 'child1',
        name: 'child1-1',
        component: _import('test/list'),
        meta: {
          title: '子标签1',
          icon: 'binding'
        }
      },
      {
        path: 'child2',
        name: 'child1-2',
        component: _import('test/list2'),
        meta: {
          title: '子标签2',
          icon: 'comment'
        }
      },
      {
        path: 'child3',
        name: 'child1-3',
        component: _import('test/list'),
        meta: {
          title: '子标签3',
          icon: 'content'
        }
      },
      {
        path: 'xxx-add',
        name: 'xxx-add',
        hidden: true,
        component: _import('test/add'),
        meta: {
          title: '添加页面'
        }
      }
    ]
  },
  {
    path: '/parent2',
    component: Layout,
    redirect: 'noredirect',
    name: 'parent2',
    alwaysShow: true,
    meta: {
      title: '测试父标签1',
      icon: 'drag'
    },
    children: [
      {
        path: 'child1',
        name: 'child2-1',
        component: _import('test/list2'),
        meta: {
          title: '子标签1',
          icon: 'edit'
        }
      }
    ]
  },
  {
    path: '/parent3',
    component: Layout,
    redirect: 'noredirect',
    name: 'parent3',
    meta: {
      title: '测试父标签1',
      icon: 'manager'
    },
    children: [
      {
        path: 'child1',
        name: 'child3-1',
        component: _import('test/list'),
        meta: {
          title: '子标签1',
          icon: 'report'
        }
      },
      {
        path: 'child2',
        name: 'child3-2',
        component: _import('test/list2'),
        meta: {
          title: '子标签2',
          icon: 'topic'
        }
      },
      {
        path: 'child3',
        name: 'child3-3',
        component: _import('test/list'),
        meta: {
          title: '子标签3',
          icon: 'plus'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

