import http from '@/shared/services/http-common'

export default class AssetsService {
  getAssetsByPropertyId (id) {
    return http.get(`/assets?propertyId=${id}`)
  }

  getMainAssetByPropertyId (id) {
    return http.get(`/assets?propertyId=${id}&preview=1`)
  }

  createAsset (data, id) {
    return http.post(`/property/${id}/propertyasset`, data)
  }

  deleteAsset (id) {
    return http.delete(`/assets/${id}`)
  }
}
