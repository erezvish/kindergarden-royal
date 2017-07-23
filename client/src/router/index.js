import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import IntroCmp from '@/components/IntroCmp'
import MainPanel from '@/components/MainPanel'
import AdminCmp from '@/components/AdminCmp'
import LoginCmp from '@/components/LoginCmp'

// test component for dev time

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main-panel',
      component: MainPanel
    },
    {
      path: '/admin',
      name: 'admin-cmp',
      component: AdminCmp
    },
    {
      path: '/parent/:kidId',
      name: '/parent',
      component: MainPanel
    },
    {
      path: '/login',
      name: 'login-cpm',
      component: LoginCmp
    },
    {
      path: '/intro',
      name: 'intro-cmp',
      component: IntroCmp
    },
  ]
})
