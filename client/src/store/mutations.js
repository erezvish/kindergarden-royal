export default {
    getKids(state, { kids }) {
        const len = state.kids.length
        state.kids.splice(0, len, ...kids)
    },

    createKid(state, { kid }) {
        state.kids.push(kid)
    },

    updateKid(state, { kid }) {
        const _id = kid._id
        kid.emojiType = null;
        kid.emojiTimeoutIdx = null;
        const idx = state.kids.findIndex(someKid => someKid._id === _id)
        if (idx !== -1) {
            state.kids.splice(idx, 1, kid)
        } else {
            console.error('error in mutation: update kid')
        }
    },

    deleteKid(state, { _id }) {
        const idx = state.kids.findIndex(someKid => someKid._id === _id)
        if (idx !== -1) {
            state.kids.splice(idx, 1)
        } else {
            console.error('error in delete kid:', kid.firstName, kid.lastName, 'is not found in state and therefore cannot be deleted')
        }
    },

    filterKids(state, { text, radio }) {
        state.kidsFilter.text = text;
        state.kidsFilter.radio = radio;
        console.log('state filter:', state.kidsFilter)
    },

    login(state, payload) {
        if (payload.user.type === 'admin') {
            state.isAdmin = true
            localStorage.setItem('isAdmin', true)
        }
        else if (payload.user.type === 'basic') {
            state.isBasic = true
            localStorage.setItem('isBasic', true)
        }
    },

    logout(state) {
        state.isAdmin = false
        localStorage.removeItem('isAdmin')
        state.isBasic = false
        localStorage.removeItem('isBasic')
        state.isParent = false
    },

    setParent(state, payload) {
        state.isParent = true
    },

    //mutations that refer to Messages
    receiveParentMessage(state, { message }) {
        // console.log('Message reached the mutation!!!')
        state.messages.unshift(message)
    },
    receiveEmojiMessage(state, { _id, emojiType }) {
        // console.log('Emoji reached the mutation!!!')
        const idx = state.kids.findIndex(kid => kid._id === _id)
        if (idx !== -1) {
            let updatedKid = Object.assign({}, state.kids[idx])
            clearTimeout(updatedKid.emojiTimeoutIdx);
            updatedKid.emojiType = emojiType;
            state.kids.splice(idx, 1, updatedKid)
            updatedKid.emojiTimeoutIdx =  setTimeout(_ => {
                updatedKid.emojiType = null;
                state.kids.splice(idx, 1, updatedKid)
            }, 7000)
            // console.log('updated kid:', updatedKid)
            // console.log('updated state with kid emoji:', state.kids)    
        }
    },
    getMessages(state, { messages }) {
        const len = state.messages.length
        state.messages.splice(0, len, ...messages)
    },
    deleteMessage(state, { _id }) {
        const idx = state.messages.findIndex(someMessage => someMessage._id === _id)
        if (idx !== -1) {
            state.messages.splice(idx, 1)
        } else {
            console.error('error in delete message: Could not find message')
        }
    },
}