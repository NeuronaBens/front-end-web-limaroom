import http from '@/shared/services/http-common'
import { uploadImage } from '@/shared/config/firebase/storage'

export default class AssetsService {
  getAssetsByPropertyId (id) {
    return http.get(`/assets?propertyId=${id}`)
  }

  getMainAssetByPropertyId (id) {
    return http.get(`/assets?propertyId=${id}&preview=1`)
  }

  createAsset (image, id) {
    return uploadImage(`properties/${id}`, image)
      .then((downloadUrl) => {
        return http.post(`/properties/${id}/assets`, [{ urlImage: downloadUrl }])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  deleteAsset (id) {
    return http.delete(`/assets/${id}`)
  }
}
