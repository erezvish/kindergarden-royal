import Vue from 'vue'
import Router from 'vue-router'
import MainPanel from '@/components/MainPanel'
import AdminCmp from '@/components/AdminCmp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPanel',
      component: MainPanel
    },
    {
      path: '/admin',
      name: 'AdminCmp',
      component: AdminCmp
    }
  ]
})
