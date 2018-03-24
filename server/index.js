// index.js, server initialization

import dotenv from 'dotenv'
import express from 'express'
import cookie_parser from 'cookie-parser'
import body_parser from 'body-parser'
import socketio from 'socket.io'
import http from 'http'

import socket_router from './socket'
import db from './database/db'
import api_routes from './routes'

const _ = dotenv.config()
const app = express()
const server = http.Server(app)
const io = socketio(server)
const socket = socket_router(io)

app.use(cookie_parser())
app.use(body_parser.urlencoded({ extended: true }))
app.use('/api', api_routes)

// Debug routes
// const expressListRoutes = require('express-list-routes')
// expressListRoutes({ prefix: '/auth', }, 'API:', auth_routes)

app.get('*', (req, res) => {
  const data = { error: 'Route not found'}
  res.status(404).json(data)
})

app.use((err, req, res, next) => {
  const error = err.toString()
  res.status(500).send({ error })
})

db.raw('SELECT 1+1 as result')
  .then(() => {
    console.log(`Running database on ${process.env.DB_USER}@${process.env.DB_HOST}`)
    server.listen(process.env.EXPRESS_PORT, process.env.EXPRESS_HOST)
    console.log(`Running server on http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`)
  })
  .catch(err => {
    console.log(`Error connecting database: \n, ${err}`) 
  })

