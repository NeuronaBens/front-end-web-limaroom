import http from '@/shared/services/http-common'
export default class PropertiesService {
  getProperties () {
    return http.get('/properties')
  }

  getProperty (id) {
    return http.get(`/properties/${id}`)
  }

  createProperty (data) {
    return http.post('/properties', data)
  }

  updateProperty (id, data) {
    return http.put(`/properties/${id}`, data)
  }

  deleteProperty (id) {
    return http.delete(`/properties/${id}`)
  }
}
