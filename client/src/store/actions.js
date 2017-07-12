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


    filterKids({ commit }, payload) {
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
        msgService.initEmojiSocket((_id, emojiType) => {
            commit({
                type: 'receiveEmojiMessage',
                _id,
                emojiType
            })
        })
    },

    togglePresent({ commit }, payload) {
        kidService.togglePresent(payload.kid)
    },

    login({ commit }, payload) {
        return userService.login(payload.user)
            .then(res => {
                payload.user = res.data
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

    checkParent({ commit, state }, payload) {
        if (payload.id) {
            userService.checkParent(payload.id)
                .then(isParent => {
                    commit({
                        type: 'setParent',
                        id: payload.id
                    })
                }).catch(err => {
                    payload.that.$router.push('/login')
                })
        } else {
            if (!state.isAdmin && !state.isBasic) {
                payload.that.$router.push('/login')
            }
        }
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

    sendEmoji({ commit }, payload) {
        // console.log('emoji reached action - sending to server', payload._id, payload.emojiType)
        msgService.sendEmoji(payload._id, payload.emojiType)
    },
    receiveEmojiMessage({ commit }, { _id, emojiType }) {
        console.log('emoji message from server reached action!!!')
        commit({
            type: 'receiveEmojiMessage',
            _id,
            emojiType
        })
    },
    deleteMessage({ commit }, payload) {
        msgService.delete(payload._id)
            .then(() => commit(payload))
            .catch(err => {
            })
    },
}