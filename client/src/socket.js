import io from 'socket.io-client'

const url = 'http://10.0.0.176:3001'

const socket = io(url, { path: '/socket' })

socket.on('connected', (e) => {
  console.log(e)
})

export default socket
