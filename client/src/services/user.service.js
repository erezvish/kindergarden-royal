import axios from 'axios-es6'

const url = 'http://localhost:3003'

export default {

    login(user) {
        const loginUrl = url + '/login'
        return axios.post(loginUrl, user)
    },

    logout() {
        const logoutUrl = url + '/logout'
        return axios.get(logoutUrl)
    }

}