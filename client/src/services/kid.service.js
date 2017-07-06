import axios from 'axios-es6'

import moment from 'moment';
import ioClient from 'socket.io-client'

const port = '3003';
const url = `http://localhost:${port}/data/kid`
const socket = ioClient(`http://localhost:${port}`);


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
            .catch(err => {
                console.log('list request failed:', err)
                return err;
            })
    },

    getOne(kidId) {
        const kidUrl = url + `/${kidId}`
        return axios.get(kidUrl)
            .then(kid => {
                console.log('server responded to find kid request');
                return kid;
            })
            .catch(err => {
                console.log('find kid failed');
                return err;
            })

    },

    //for CRUD actions, user has to be sent to the server in order for the server to 
    //authenticate that the request is allowable
    create(kid, user = null) {
        return axios.post(url, kid)
            .catch(err => {
                console.log('post kid object failed:', err)
                return err;
            })
    },

    update(kid, user = null) {
        const kidUrl = url + `/${kid._id}`
        return axios.put(kidUrl, kid)
            .catch(err => {
                console.log('updating kid object failed:', err)
                return err;
            })
    },

    delete(kidId, user = null) {
        const kidUrl = url + `/${kidId}`
        return axios.delete(kidUrl)
            .catch(err => {
                console.log('deleting kid object failed:', err)
                return err;
            })
    },

    //TODO: design-goal: add a feature that only allows changing with pincode
    togglePresent(kid, kidPinCode) {
        let kidCopy = Object.assign({}, kid)
        kidCopy.isPresent = !kid.isPresent
        socket.emit('toggle present', kidCopy)
    },

    initSocket(actionFunc) {
        socket.on('toggle notice', (kid) => {
            console.log('emit received!')
            if (typeof actionFunc === 'function') {
                actionFunc(kid)
            }
        })
    }
}



