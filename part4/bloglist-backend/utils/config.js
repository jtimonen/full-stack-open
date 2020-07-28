require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URL = process.env.MONGODB_URL
let NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'test') {
    MONGODB_URL = process.env.TEST_MONGODB_URL
}

module.exports = { MONGODB_URL, PORT, NODE_ENV }