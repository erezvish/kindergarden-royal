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
            radio: 'ignore'
        },
        isAdmin: true,
        isBasic: false,
        token: '',
        messages: [
            {
                _id: 1,
                to: null,
                from: '595e054774687a13702bab99',
                title: 'Hi Mister Coffee',
                text: 'Tell him to have a good day from mom',
                timestamp: null
            },
            {
                _id: 2,
                to: null,
                from: '595e321874687a13702bacd5',
                title: 'To Lone Star',
                text: 'Lone star forgot his food today, do you have raspberry jam?',
                timestamp: null
            },
            {
                _id: 3,
                to: null,
                from: '595e323174687a13702bacdb',
                title: 'Cute Barf',
                text: 'Make sure the kids understand what is a Mog please?',
                timestamp: null
            }
        ]
    },
    getters,
    actions,
    mutations
})

export default store