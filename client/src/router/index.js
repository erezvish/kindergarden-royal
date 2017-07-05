import Vue from 'vue'
import Router from 'vue-router'
import MainPanel from '@/components/MainPanel'
import AdminCmp from '@/components/AdminCmp'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Vuex from 'vuex'


Vue.use(Router)
Vue.use(Element)
Vue.use(Vuex)

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
