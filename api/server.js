const express = require('express')
const { Server: SocketServer } = require('socket.io')
const mysql = require('mysql')
const http = require('http')
require('dotenv').config()
const apiPort = 3001
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
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
})

io.on('connection', async (socket) => {
  socket.join(room)
  socket.emit('connected', `Joined ${room}`)
})
app.use(express.json())
app.use(express.static(__dirname, { dotfiles: 'allow' } ))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

app.get('/', (req, res) => {
  res.status(200).send('OVC-API')
})

app.get('/doctors', (req, res) => {
  const getDoctors = `
    SELECT
      id,
      name,
      active,
      times,
      default_times
    FROM doctors
  `
  connection.query(getDoctors, (err, rows, fields) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(rows)
    }
  })
})

app.post('/active', (req, res) => {
  const doctor = {
    id: req.body.id,
    active: req.body.active
  }
  const setActive = `
    UPDATE doctors
    SET active = ${doctor.active}
    WHERE id = ${doctor.id}
  `
  connection.query(setActive, (err, rows, fields) => {
    if (err) {
      res.status(500).send(err)
    } else {
      io.sockets.to(room).emit('update', doctor)
      res.sendStatus(200)
    }
  })
})

app.post('/times', (req, res) => {
  const doctor = {
    id: req.body.id,
    times: req.body.times
  }
  const getDoctors = `
    UPDATE doctors
    SET times = '${doctor.times}'
    WHERE id = ${doctor.id}
  `
  connection.query(getDoctors, (err, rows, fields) => {
    if (err) {
      res.status(500).send(err)
    } else {
      io.sockets.to(room).emit('update', doctor)
      res.sendStatus(200)
    }
  })
})

server.listen(apiPort, () => {
  console.log(`API Started on port ${apiPort}\n`)
})
