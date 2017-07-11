import kidService from '../services/kid.service.js'
import userService from '../services/user.service.js'
import msgService from '../services/msg.service.js'

export default {

    createKid({ commit }, payload) {
        kidService.create(payload.kid)
            .then(res => {
                payload.kid = res.data
                commit(payload)
            })
            .catch(err => {
                console.error('server cannot create kid ', payload.kid.firstName, payload.kid.lastName, err)
            })
    },

    getKids({ commit }, payload) {
        kidService.getList()
            .then(res => {
                payload.kids = res.data
                commit(payload)
            })
            .catch(err => {
                console.error('cannot get kids from server', err)
            })
    },

    updateKid({ commit }, payload) {
        // console.log('url before server:', payload.kid.imgUrl)
        kidService.update(payload.kid)
            .then(res => {
                payload.kid = res.data
                commit(payload)
                // console.log('url after server:', res.data.imgUrl)
            })
            .catch(err => {
                console.error('cannot update kid on server', payload.kid.firstName, payload.kid.lastName, err)
            })
    },

    deleteKid({ commit }, payload) {
        kidService.delete(payload._id)
            .then(() => commit(payload))
            .catch(err => {
            })
    },


    filterKids({commit}, payload) {
        console.log('Firing filter Action!')
        payload.text = payload.text.toLowerCase()
        commit(payload);
    },

    // sortKids({commit}, payload) {
    //     console.log('Initiating Sort Action!')
    //     commit(payload);
    // },

    initSocket({ commit }) {
        kidService.initSocket(kid => {
            commit({
                type: 'updateKid',
                kid
            })
        }),
            msgService.initSocket(message => {
                commit({
                    type: 'receiveParentMessage',
                    message
                })
            })
    },

    togglePresent({ commit }, payload) {
        kidService.togglePresent(payload.kid)
    },

    login({ commit }, payload) {
        return userService.login(payload.user)
            .then(res => {
                payload.token = res.data.token
                commit(payload)
                return res
            })
    },

    logout({ commit }, { type }) {
        return userService.logout()
        .then(() => {
            commit(type)
        })
    },
    //actions that refer to Messages

    getMessages({ commit }, payload) {
        msgService.getList()
            .then(res => {
                payload.messages = res.data
                commit(payload)
            })
            .catch(err => {
                console.error('cannot get messages from server', err)
            })
    },

    sendParentMessage({ commit }, payload) {
        msgService.send(payload.message)
    },
    receiveParentMessage({ commit }, { message }) {
        commit({
            type: 'receiveParentMessage',
            message
        })
    },
    deleteMessage({ commit }, payload) {
        msgService.delete(payload._id)
            .then(() => commit(payload))
            .catch(err => {
            })
    },
}