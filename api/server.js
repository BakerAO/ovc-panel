import express from 'express'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import routes from './routes.js'

const apiPort = 8001
const room = 'ovcRoom'

const app = express()

const server = http.Server(app)
const io = new SocketServer(server, {
  path: '/socket',
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on('connection', async (socket) => {
  socket.join(room)
  socket.emit('connected', `Joined ${room}`)
})

app.use(express.json())
// app.use(express.static(__dirname, { dotfiles: 'allow' } ))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

app.use('/', routes(io, room))

server.listen(apiPort, () => {
  console.log(`API Started on http://localhost:${apiPort}\n`)
})
