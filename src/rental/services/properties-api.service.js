import http from '@/shared/services/http-common'
import Property from '@/rental/domain/entity/property.entity'
export default class PropertiesService {
  getAll () {
    return http.get('/properties')
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return data.resource.map(property => new Property(property))
      })
  }

  getById (id) {
    return http.get(`/properties/${id}`)
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return new Property(data.resource)
      })
  }

  create (property) {
    return http.post('/properties', property)
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return new Property(data.resource)
      })
  }

  update (id, data) {
    return http.put(`/properties/${id}`, data)
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return new Property(data.resource)
      })
  }

  assignFeatures (id, features) {
    return http.post(`/properties/${id}/features`, features)
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return data.resource
      })
  }

  delete (id) {
    return http.delete(`/properties/${id}`)
  }
}
