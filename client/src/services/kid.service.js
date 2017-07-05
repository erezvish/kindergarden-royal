import axios from 'axios-es6'

const url = 'http://localhost:3003/data/kid'

// const tempKid = {
//     _id: 1,
//     firstName: 'Erez',
//     lastName: 'the great',
//     isPresent: 'false',
//     isApproved: 'false',
//     imgUrl: 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/31/1438173668-cute-success-kid.jpg',
//     parents: '[{_id:100, firstName: "moshe", phoneNum: 555, email: "Iamhere@here.com" }]'
// }

export default {


    getList() {
        return axios.get(url)
            .then(res => console.log('server responded list request'))
            .catch(err => console.log('list request failed:', err))
    },

    //for CRUD actions, user has to be sent to the server in order for the server to 
    //authenticate that the request is allowable
    create(kid, user = null) {
        return axios.post(url, kid)
            .then(res => console.log('server responded to kid post'))
            .catch(err => console.log('post kid object failed:', err))
    },

    update(kid, user = null) {
        const childUrl = url + `/${kid._id}`
        return axios.put(childUrl, tempKid)
            .then(res => console.log('server responded to kid update'))
            .catch(err => console.log('updating kid object failed:', err))
    },

    delete(kidId, user = null) {
        const childUrl = url + `/${kidId}`
        return axios.delete(childUrl)
            .then(res => console.log('server responded to kid delete'))
            .catch(err => console.log('deleting kid object failed:', err))
    }
}