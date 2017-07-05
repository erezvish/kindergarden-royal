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
            .then(res => {
                console.log('server responded list request')
                return res;
            })

            .catch(err => {
                console.log('list request failed:', err)
                return err;
            })
    },
    getOne(kidId) {
        const kidUrl = url + `/${kidId}`
        return axios.get(kidUrl)
            .then(kid => {
                console.log('server responded to find kid request:', kid);
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
            .then(res => {
                console.log('server responded to kid post')

                return res;
            })
            .catch(err => {
                console.log('post kid object failed:', err)
                return err;
            })
    },

    update(kid, user = null) {
        const kidUrl = url + `/${kid._id}`
        return axios.put(kidUrl, kid)
            .then(res => {
                console.log('server responded to kid update')
                return res;
            })
            .catch(err => {
                console.log('updating kid object failed:', err)
                return err;
            })
    },

    delete(kidId, user = null) {
        const kidUrl = url + `/${kidId}`
        return axios.delete(kidUrl)
            .then(res => {
                console.log('server responded to kid delete')
                return res;
            })
            .catch(err => {
                console.log('deleting kid object failed:', err)
                return err;
            })
    },
    //TODO: design-goal: add a feature that only allows changing with pincode
    toggleIsPresent(kidId, kidPinCode) {
        this.getOne(kidId)
            .then(res => {
                console.log('updating kid status:', res);
                res.data.isPresent = !res.data.isPresent;
                return this.update(res.data)
                    .then(kid => {
                        console.log('kid update successful, notifying all')
                        // debugger;
                        socket.emit('toggle present', JSON.stringify(kid))
                        return kid.data;
                    })
                    .catch(err => {
                        console.log('cannot update kid status - update phase:', err)
                        return err
                    })
            })
            .catch(err => {
                console.log('cannot update kid status - find phase:', err)
                return err;
            })
    },
}
socket.on('toggle notice', (res) => {
    console.log('emit received!:', JSON.parse(res))
})

