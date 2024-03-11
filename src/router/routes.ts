import {lazy} from 'react'

export default [
  {
    path: '/',
    meta: {
      title: '首页',
      isLogin: true,
      isMenu: true,
    },
    component: lazy(() => import('../views/Home'))
  },
  {
    path: '/about',
    meta: {
      title: '关于我们',
      isLogin: true,
      isMenu: true,
    },
    component: lazy(() => import('../views/About'))
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      isLogin: false,
      isMenu: true,
    },
    component: lazy(() => import('../views/Login'))
  }
]