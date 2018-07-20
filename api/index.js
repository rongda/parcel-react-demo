/* eslint-disable */
/* nodemon  */
const app = require('express')()
const bodyParse = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
app.use(cookieParser())
app.use(bodyParse.json())
app.use('/user', userRouter)

module.exports = app
