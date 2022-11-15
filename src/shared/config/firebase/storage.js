import { app } from './index'
import { getStorage, ref, uploadBytes, getDownloadURL, getMetadata } from 'firebase/storage'
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'
export const storage = getStorage(app)

const saveImage = async (image, path) => {
  const imageRef = ref(storage, path)
  const snapshot = await uploadBytes(imageRef, image)

  if (snapshot) {
    const downloadUrl = await getDownloadURL(imageRef)
    const metadata = await getMetadata(imageRef)
    return { snapshot, downloadUrl, metadata }
  }
}

export const uploadImage = async (path, image) => {
  const imageName = uuidv5(image.name, uuidv4())

  return saveImage(image, `${path}/${imageName}`)
    .then((result) => {
      const { downloadUrl } = result
      return downloadUrl
    })
    .catch((error) => {
      console.log(error)
    })
}
