import http from '@/shared/services/http-common'
import { uploadImage } from '@/shared/config/firebase/storage'
import Asset from '@/rental/domain/entity/asset.entity'

export default class AssetsService {
  getAllByPropertyId (id) {
    return http.get(`/assets?propertyId=${id}`)
      .then((response) => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return data.resource.map(asset => new Asset(asset))
      })
  }

  create (image, { id }) {
    return uploadImage(`properties/${id}`, image)
      .then((downloadUrl) => {
        return http.post(`/properties/${id}/assets`, [{ urlImage: downloadUrl }])
          .then((response) => {
            const data = response.data
            if (!data.success) { throw new Error(data.message) }
            return data.resource.map(asset => new Asset(asset))
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  delete (id) {
    return http.delete(`/assets/${id}`)
  }
}
