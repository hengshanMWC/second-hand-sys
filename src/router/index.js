import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import api from '@/utils/api'
import SERVER  from '@/utils/api/config'
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
            position: [
              '首页'
            ],
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
            position: [
              '商品管理',
              '服饰'
            ],
            title: '服饰',
          },
          component: () => import('@/views/layout/trappings')
        },
        {
          path: 'daily_supplies',
          name: 'daily_supplies',
          meta: {
            position: [
              '商品管理',
              '日常用品'
            ],
            title: '日常用品',
          },
          component: () => import('@/views/layout/daily_supplies')
        },
        {
          path: 'beautiful',
          name: 'beautiful',
          meta: {
            position: [
              '商品管理',
              '美容护肤品'
            ],
            title: '美容护肤品',
          },
          component: () => import('@/views/layout/beautiful')
        },
        {
          path: 'electronic',
          name: 'electronic',
          meta: {
            position: [
              '商品管理',
              '电子商品'
            ],
            title: '电子商品',
          },
          component: () => import('@/views/layout/electronic')
        },
        //banner
        {
          path: 'banner',
          name: 'banner',
          meta: {
            position: [
              'banner图',
            ],
            title: 'banner图',
          },
          component: () => import('@/views/layout/banner')
        },
        //用户管理
        {
          path: 'user',
          name: 'user',
          meta: {
            position: [
              '人员管理',
              '用户管理',
            ],
            title: '用户管理',
          },
          component: () => import('@/views/layout/user'),
          // components: {
          //   default: () => import('@/views/layout/user'),
          //   a: () => import('@/views/layout/banner'),
          //   b: () => import('@/views/layout/sys'),
          // },
        },
        //用户详情
        {
          path: 'userDetail',
          name: 'userDetail',
          meta: {
            position: [
              '人员管理',
              '用户管理',
              '用户详情'
            ],
            title: '用户详情',
          },
          component: () => import('@/views/layout/user-detail'),
        },
        //管理员
        {
          path: 'sys',
          name: 'sys',
          meta: {
            position: [
              '人员管理',
              '管理员列表',
            ],
            title: '管理员列表',
          },
          component: () => import('@/views/layout/sys')
        },
        //问题反馈
        {
          path: 'follow',
          name: 'follow',
          meta: {
            position: [
              '问题反馈',
            ],
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
function getUserInfo(){

}
router.beforeEach((to, from, next) => {
  if(to.name !== 'login' && Object.keys(store.state.userInfo).length === 0) {
    api(SERVER.GET_ISLOGIN)
      .then( data => {
        return data.state ? api(SERVER.GET_CURRENTUSERINFO) : next({name: 'login'})
      })
      .then( data => {
        store.commit('setUserInfo',data.data)
        next()
      })
      .catch( data => next({name: 'login'}))
  } else {
    next()
  }
})
export default router