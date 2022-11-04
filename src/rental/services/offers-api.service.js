import http from '@/shared/services/http-common'
export default class OffersService {
  getOffers () {
    return http.get('/rentaloffers/all')
  }

  getOffer (id) {
    return http.get(`/rentaloffers/${id}`)
  }

  getOffersByUserId (id) {
    return http.get(`/users/${id}/rental/offers`)
  }

  createOffer (data, id) {
    return http.post(`/users/${id}/rental/offer`, data)
  }

  updateOffer (id, data) {
    return http.put(`/offers/${id}`, data)
  }

  deleteOffer (id) {
    return http.delete(`/offers/${id}`)
  }
}
