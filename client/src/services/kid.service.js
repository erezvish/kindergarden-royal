import axios from 'axios-es6'
import moment from 'moment';
import ioClient from 'socket.io-client'

const port= '3003';
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
        const childUrl = url + `/${kid._id}`
        return axios.put(childUrl, tempKid)
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
        const childUrl = url + `/${kidId}`
        return axios.delete(childUrl)
            .then(res => {
                console.log('server responded to kid delete')
                return res;
            })
            .catch(err => {
                console.log('deleting kid object failed:', err)
                return err;
        })
    },

    setIsPresent(kidId) {
        console.log('hi!');
    },

    userLogged(nickName='tempname') {
        console.log('emitting user', JSON.stringify(nickName))
        socket.emit('new login', JSON.stringify(nickName));
    }
}
