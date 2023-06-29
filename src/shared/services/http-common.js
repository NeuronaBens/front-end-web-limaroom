import axios from 'axios'

//https://meetyouroommate-backend.herokuapp.com

export default axios.create({
  baseURL: 'https://lima-room-api-v2.azurewebsites.net/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})
