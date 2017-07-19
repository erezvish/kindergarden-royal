import axios from 'axios-es6'
import moment from 'moment';

import ioClient from 'socket.io-client'
import appSocket from './socket'

const port = appSocket.port;
const url = `http://localhost:${port}/data/msg`

export default {
    initSocket(actionFunc) {
        appSocket.socket.on('parent message', (message) => {
            // console.log('emit received!')
            if (typeof actionFunc === 'function') {
                actionFunc(message)
            }
        })
    },
    initEmojiSocket(actionFunc) {
        appSocket.socket.on('emoji message', (_id, emojiType) => {
            // console.log('emit received!')
            if (typeof actionFunc === 'function') {
                actionFunc(_id, emojiType)
            }
        })
    },

    send(message) {
        // console.log('message has left the service')
        appSocket.socket.emit('parent message', message)
    },
    sendEmoji(_id, emoji) {
        // console.log('sending emoji')
        appSocket.socket.emit('emoji message', _id, emoji)
    },

    getList() {
        return axios.get(url)
            .catch(err => {
                console.log('list request failed:', err)
                return err;
            })
    },

    getOne(messageId) {
        const messageUrl = url + `/${messageId}`
        return axios.get(messageUrl)
            .then(message => {
                console.log('server responded to find message request');
                return message;
            })
            .catch(err => {
                console.log('find message failed');
                return err;
            })
    },

    create(message) { }, //done via WebSockets

    delete(messageId) {
        const messageUrl = url + `/${messageId}`
        return axios.delete(messageUrl)
            .catch(err => {
                console.log('deleting message object failed:', err)
                return err;
            })
    },
}