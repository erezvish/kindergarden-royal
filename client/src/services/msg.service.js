import axios from 'axios-es6'
import moment from 'moment';

import ioClient from 'socket.io-client'
import appSocket from './socket'

const port = appSocket.port;
const url = `http://localhost:${port}/data/msg`
console.log('msg socket:', appSocket.socket)

export default {
    initSocket(actionFunc) {
        appSocket.socket.on('chat message', (message) => {
            console.log('emit received!')
            if (typeof actionFunc === 'function') {
                actionFunc(message)
            }
        })
    },
    send(message) {
        console.log('message has left the service')
        appSocket.socket.emit('chat message', message)
    },

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
}