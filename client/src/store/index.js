import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import kidService from '../services/kid.service.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        kids: [],
        isAdmin: false,
        token: ''
    },
    actions,
    mutations
})

export default store