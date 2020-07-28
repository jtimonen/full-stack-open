import axios from 'axios'
import config from '../config.js'
const baseUrl = config.baseUrl
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const url = `${ baseUrl }/${id}`
  const request = axios.put(url, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${ baseUrl }/${id}`
  const request = axios.delete(url, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove, setToken }