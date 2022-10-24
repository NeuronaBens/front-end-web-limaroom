import axios from 'axios'

export default axios.create({
  baseURL: 'https://meetyouroommate-backend.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json'
  }
})
