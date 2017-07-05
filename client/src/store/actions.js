export default {

    createKid({ commit }, payload) {
        kidService.create(payload.kid)
            .then(kid => {
                payload.kid = kid
                commit(payload)
            })
            .catch(err => {
                console.error('server cannot create kid ', kid.firstName, kid.lastName, err)
            })
    },

    getKids({ commit }, payload) {
        kidService.get()
            .then(kids => {
                payload.kids = kids
                commit(payload)
            })
            .catch(err => {
                console.error('cannot get kids from server', err)
            })
    },

    updateKid({ commit }, payload) {
        kidService.update(payload.kid)
            .then(kid => {
                payload.kid = kid
                commit(payload)
            })
            .catch(err => {
                console.error('cannot update kid on server', kid.firstName, kid.lastName, err)
            })
    },

    deleteKid({ commit }, payload) {
        kidService.delete(paload._id)
            .then(() => commit(payload))
            .catch(err => {
                console.error('cannot delete kid on server', kid.firstName, kid.lastName, err)
            })
    },

    toggleIsPresent() {

    }
}