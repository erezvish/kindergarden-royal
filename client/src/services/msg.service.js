import moment from 'moment';

import ioClient from 'socket.io-client'
import appSocket from './socket'

const port = appSocket.port;
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
}