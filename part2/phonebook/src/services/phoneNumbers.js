import axios from 'axios'
const baseUrl = 'http://localhost:3001/contacts'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const destroy = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
  }

export default { getAll, create, update, destroy }