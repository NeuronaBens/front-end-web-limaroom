import http from '@/shared/services/http-common'

export default class AssetsService {
  getAssetsByPropertyId (id) {
    return http.get(`/assets?propertyId=${id}`)
  }

  getMainAssetByPropertyId (id) {
    return http.get(`/assets?propertyId=${id}&preview=1`)
  }

  createAsset (data) {
    return http.post('/assets', data)
  }

  updateAsset (id, data) {
    return http.put(`/assets/${id}`, data)
  }

  deleteAsset (id) {
    return http.delete(`/assets/${id}`)
  }
}
