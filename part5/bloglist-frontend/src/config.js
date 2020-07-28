require('dotenv').config()
const node_env = process.env.NODE_ENV

let baseUrl = 'https://bloglister.herokuapp.com/api/blogs' // production mode
if (!node_env || node_env === 'development') {
  baseUrl = '/api/blogs' // dev mode
}

export default{ baseUrl }