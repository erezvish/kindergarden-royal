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
        const idx = state.kids.findIndex(someKid => someKid._id === _id)
        if (idx !== -1) {
            state.kids.splice(idx, 1, kid)
        } else {
            console.error('error in update kid:', kid.firstName, kid.lastName, 'is not found in state and therefore cannot be updated')
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
        state.isAdmin = true
        state.token = payload.token
    },

    logout(state) {
        state.isAdmin = false
        state.token = ''
    },
}