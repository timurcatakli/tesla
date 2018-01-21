// ExpressJS: Web framework for Node.js
const express = require('express')
// handles routing
const path = require('path')
// http server
const http = require('http')
// pg: postgresql middleware
const { Pool, Client } = require('pg')
// body-parser: Parse incoming request bodies in a middleware before handlers.
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

// app as an express instance
const app = express()
const server = http.createServer(app)

// Connect webpack in order to utilize single IP for API Backend & Front End
app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// allow cors so that app can access the api server
app.use((reqest, response, next) => {
  response.header("Access-Control-Allow-Origin", "*")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Handles all routes so you do not get a not found error

// initiate a new pg pool
const pool = new Pool({
  host: 'localhost',
  database: 'trivia',
  port: 5432,
})

pool.query('SELECT * FROM "Question" LIMIT 100;', (err, table) => {
  if(err) {
    console.log(err)
  }
  console.log('Finished Successfully', table.rows)
  pool.end()
})
//


app.get(['/admin', '/user'], (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// start listening for HTTP requests on specificed port.
const port = 3000
// start server to listen not the app
require('./app/routes')(app, {})
server.listen(port)
