require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const { PROTECT_ROUTES, API_KEY } = process.env

const indexRouter = require('./routes/index')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((req, res, next) => {
  if (PROTECT_ROUTES) {
    let api_key
    api_key = req.body.api_key || req.query.api_key
    if (API_KEY === api_key) {
      next()
      return
    }
    res.statusCode = 401
    res.json({
      message: 'not_authorised_to_use_api'
    })
  } else {
    next()
  }

  return
})

app.use('/', indexRouter)

module.exports = app
