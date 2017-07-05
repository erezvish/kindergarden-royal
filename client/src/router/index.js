import Vue from 'vue'
import Router from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import MainPanel from '@/components/MainPanel'
import AdminCmp from '@/components/AdminCmp'

// test component for dev time
import TestCmp from '@/components/TestCmp'

Vue.use(Element)
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
      path: '/test',
      name: 'test-cmp',
      component: TestCmp
    }
  ]
})
