const express = require('express')
const mysql = require('mysql')
require('dotenv').config()
const app = express()
app.use(express.static(__dirname, { dotfiles: 'allow' } ))
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'ovc'
})
app.use(express.json())
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
    SELECT id, name, active, times, default_times
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
  const setActive = `
    UPDATE doctors
    SET active = ${req.body.active}
    WHERE id = ${req.body.id}
  `
  connection.query(setActive, (err, rows, fields) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(rows)
    }
  })
})

app.post('/times', (req, res) => {
  const getDoctors = `
    UPDATE doctors
    SET times = '${req.body.times}'
    WHERE id = ${req.body.id}
  `
  connection.query(getDoctors, (err, rows, fields) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.sendStatus(200)
    }
  })
})

app.listen(3001, () => {
  console.log('API Started on port 3001\n')
})
