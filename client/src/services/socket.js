
import ioClient from 'socket.io-client'
const port = '3003';
const url = `http://localhost:${port}/data/`
const socket = process.env.NODE_ENV === 'development' ? ioClient(`http://localhost:${port}`) : ioClient()

export default {
    port,
    url,
    socket
}