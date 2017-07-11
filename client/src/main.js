// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import annyang from 'annyang'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'
import VueTranslate from 'vue-translate-plugin'
import App from './App'
import router from './router'
import store from './store'
import translationLocales from './services/translate.service.js'

Vue.use(VueTranslate)

Vue.locales(translationLocales)

Vue.use(Element)

Vue.use(Vuex)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
