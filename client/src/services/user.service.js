//user service

import axios from 'axios-es6'

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3003' : ''

export default {

    login(user) {
        const loginUrl = url + '/login'
        return axios.post(loginUrl, user)
    },

    logout() {
        const logoutUrl = url + '/logout'
        return axios.get(logoutUrl)
    },

    checkParent(id) {
        return axios.get(url + '/data/kid/' + id)
    }
}