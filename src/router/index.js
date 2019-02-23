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
         */
        {
          path: 'type',
          name: 'type',
          meta: {
            position: [
              '商品管理',
              '分类列表'
            ],
            title: '分类列表',
          },
          component: () => import('@/views/layout/type')
        },
        {
          path: 'typeDetail',
          name: 'typeDetail',
          meta: {
            position: [
              '商品管理',
              '分类列表',
              '分类配置'
            ],
            title: '分类配置',
          },
          component: () => import('@/views/layout/type-detail')
        },
        {
          path: 'commodity',
          name: 'commodity',
          meta: {
            position: [
              '商品管理',
              '商品列表'
            ],
            title: '商品列表',
          },
          component: () => import('@/views/layout/commodity')
        },
        {
          path: 'commodityDetail',
          name: 'commodityDetail',
          meta: {
            position: [
              '商品管理',
              '商品列表',
              '商品配置',
            ],
            title: '商品配置',
          },
          component: () => import('@/views/layout/commodity-detail')
        },
        {
          path: 'order',
          name: 'order',
          meta: {
            position: [
              '商品管理',
              '订单列表'
            ],
            title: '订单列表',
          },
          component: () => import('@/views/layout/order')
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
        {
          path: 'bannerDetail',
          name: 'bannerDetail',
          meta: {
            position: [
              'banner图',
              'banner详情',
            ],
            title: 'bannerDetail图',
          },
          component: () => import('@/views/layout/banner-detail')
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
        //用户详情
        {
          path: 'sysDetail',
          name: 'sysDetail',
          meta: {
            position: [
              '人员管理',
              '管理员列表',
              '管理员详情'
            ],
            title: '用户详情',
          },
          component: () => import('@/views/layout/sys-detail'),
        },
        //信息中心
        {
          path: 'news',
          name: 'news',
          meta: {
            position: [
              '信息管理',
              '消息中心',
            ],
            title: '消息中心',
          },
          component: () => import('@/views/layout/news')
        },
        //消息编辑
        {
          path: 'newsDetail',
          name: 'newsDetail',
          meta: {
            position: [
              '信息管理',
              '消息中心',
              '消息编辑',
            ],
            title: '消息编辑',
          },
          component: () => import('@/views/layout/news-detail')
        },
        //问题反馈
        {
          path: 'follow',
          name: 'follow',
          meta: {
            position: [
              '信息管理',
              '问题反馈',
            ],
            title: '问题反馈',
          },
          component: () => import('@/views/layout/follow')
        },
        //反馈编辑
        {
          path: 'followDetail',
          name: 'followDetail',
          meta: {
            position: [
              '信息管理',
              '反馈编辑',
            ],
            title: '反馈编辑',
          },
          component: () => import('@/views/layout/follow-detail')
        },
        //认证管理
        {
          path: 'prove',
          name: 'prove',
          meta: {
            position: [
              '信息管理',
              '认证管理',
            ],
            title: '认证管理',
          },
          component: () => import('@/views/layout/prove')
        },
        //认证管理
        {
          path: 'proveDetail',
          name: 'proveDetail',
          meta: {
            position: [
              '消息中心',
              '认证详情',
            ],
            title: '认证详情',
          },
          component: () => import('@/views/layout/prove-detail')
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
        console.log(data)
        return data.state ? api(SERVER.GET_CURRENTUSERINFO) : next({name: 'login'})
      })
      .then( data => {
        console.log(data)

        store.commit('setUserInfo',data.data)
        next()
      })
      .catch( data => next({name: 'login'}))
  } else {
    next()
  }
})
export default router