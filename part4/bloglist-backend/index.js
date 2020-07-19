require('dotenv').config()
const app = require('./app') // Express App
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})