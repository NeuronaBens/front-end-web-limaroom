import axios from 'axios'

export default axios.create({
  baseURL: 'http://meetyourroommate.eastus.cloudapp.azure.com:8091/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})
