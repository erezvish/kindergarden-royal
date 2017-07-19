import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import kidService from '../services/kid.service.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        kids: [],
        emptyKid: {
            firstName: '',
            lastName: '',
            gender: '',
            imgUrl: '',
            emojiType: null,
            parents: [
                {
                    firstName: '',
                    lastName: '',
                    phone: ''
                },
                {
                    firstName: '',
                    lastName: '',
                    phone: ''
                }
            ]
        },
        kidsFilter: {
            text: '',
            radio:'ignore'
        },
        isAdmin: false,
        isBasic: false,
        isParent: true,
        messages: []
    },
    getters,
    actions,
    mutations
})

export default store