import io from 'socket.io-client'

const url = `http://${window.location.hostname}:8001`

const socket = io(url, { path: '/socket' })

socket.on('connected', (e) => {
  console.log(e)
})

export default socket
