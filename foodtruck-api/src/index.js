import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import config from './config'
import routes from './routes'

let app = express()
app.server = http.createServer(app)

// middleware



// parse raw
app.use(bodyParser.raw())

// parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}))

// logger middleware
app.use((req, res, next) => {
  // GET /v1/restaurant (body: { "name": "restaurant"})
  console.log(`${req.method} ${req.originalUrl} (body: ${req.body})`)
  next()
})

// passport config

// api routes
app.use('/v1', routes)

// run server
app.server.listen(config.port)
console.log(`Started server on port ${app.server.address().port}`)

export default app
