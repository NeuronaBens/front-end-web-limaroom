import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8091/api/v1',
  // baseURL: 'https://meetyouroommate-backend.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})
