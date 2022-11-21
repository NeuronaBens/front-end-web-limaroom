import http from '@/shared/services/http-common'
import Offer from '@/rental/domain/entity/offer.entity'
export default class OffersService {
  getVisibles () {
    return http.get('/rentaloffers/visibles')
      .then((response) => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return data.resource.map(offer => new Offer(offer))
      })
  }

  getById (id) {
    return http.get(`/rentaloffers/${id}`)
      .then((response) => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return new Offer(data.resource)
      })
  }

  getAllByUserId (id) {
    return http.get(`/users/${id}/rental/offers`)
      .then((response) => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return data.resource.map(offer => new Offer(offer))
      })
  }

  create (offer, id) {
    return http.post(`/users/${id}/rental/offer`, offer)
      .then((response) => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return new Offer(data.resource)
      })
  }

  changeVisibility (id, visible) {
    const path = visible ? 'not/visible' : 'visible'

    return http.put(`/rentaloffers/${id}/${path}`)
      .then((response) => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return new Offer(data.resource)
      })
  }
}
