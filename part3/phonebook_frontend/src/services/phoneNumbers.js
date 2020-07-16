import axios from 'axios'
const baseUrl = 'https://boiling-lake-60849.herokuapp.com/api/persons'
//const baseUrl = 'http://localhost:3001/api/persons'

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
