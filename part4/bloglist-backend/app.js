// Requires
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const notesRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// Database connection
logger.info('connecting to', config.MONGODB_URL)
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { logger.info('Connected to MongoDB') })
    .catch((error) => { logger.error('Error connection to MongoDB:', error.message) })

// Create Express App
const app = express()

// Middleware
app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

// Routers
app.use('/api/blogs', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// Errors
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
