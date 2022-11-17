import http from '@/shared/services/http-common'
export default class OffersService {
  getOffers () {
    return http.get('/rentaloffers/visibles')
  }

  getOffer (id) {
    return http.get(`/rentaloffers/${id}`)
  }

  getOffersByUserId (id) {
    return http.get(`/users/${id}/rental/offers`)
  }

  createOffer (offer, id) {
    return http.post(`/users/${id}/rental/offer`, offer)
  }

  changeOfferVisibility (id, visible) {
    const path = visible ? 'not/visible' : 'visible'

    return http.put(`/rentaloffers/${id}/${path}`)
  }
}
