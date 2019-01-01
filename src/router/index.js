import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from '@/router/beforeEach'
Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/home',
      component: () => import('@/views/layout'),
      children: [
        {
          path: 'home',
          name: 'home',
          meta: {
            title: '首页',
          },
          component: () => import('@/views/layout/home')
        },
        /**
         * 商品管理
         * trappings:服饰
         * daily_supplies:日常用品
         * beautiful：美容护肤品
         * electronic 电子商品
         * */
        {
          path: 'trappings',
          name: 'trappings',
          meta: {
            title: '服饰',
            parentTitle: '商品管理'
          },
          component: () => import('@/views/layout/trappings')
        },
        {
          path: 'daily_supplies',
          name: 'daily_supplies',
          meta: {
            title: '日常用品',
            parentTitle: '商品管理'
          },
          component: () => import('@/views/layout/daily_supplies')
        },
        {
          path: 'beautiful',
          name: 'beautiful',
          meta: {
            title: '美容护肤品',
            parentTitle: '商品管理'
          },
          component: () => import('@/views/layout/beautiful')
        },
        {
          path: 'electronic',
          name: 'electronic',
          meta: {
            title: '电子商品',
            parentTitle: '商品管理'
          },
          component: () => import('@/views/layout/electronic')
        },
        //banner
        {
          path: 'banner',
          name: 'banner',
          meta: {
            title: 'banner图',
          },
          component: () => import('@/views/layout/banner')
        },
        //用户管理
        {
          path: 'user',
          name: 'user',
          meta: {
            title: '用户管理',
            parentTitle: '人员管理'
          },
          component: () => import('@/views/layout/user')
        },
        //管理员
        {
          path: 'sys',
          name: 'sys',
          meta: {
            title: '管理员列表',
            parentTitle: '人员管理'
          },
          component: () => import('@/views/layout/sys')
        },
        //问题反馈
        {
          path: 'follow',
          name: 'follow',
          meta: {
            title: '问题反馈',
          },
          component: () => import('@/views/layout/follow')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
  ]
})
router.beforeEach((to, from, next) => {
  next();
})
export default router