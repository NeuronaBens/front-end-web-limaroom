<template class="input-image">
  <label class="button-black">
    <input type="file" @change="changePreviewImage" ref="imageBlob" />
    UPLOAD MAIN IMAGE
  </label>
  <img :src="imagePreview" alt="" class="preview-image">
  <Toast />
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";
input[type="file"] {
  display: none;
}

.preview-image {
  display: block;
  margin: 0 auto;
  width: 50%;
  max-width: 50rem;
}
</style>

<script setup>
import { ref, defineExpose } from 'vue'
import { useToast } from 'primevue/usetoast'

const imagePreview = ref('')
const imageBlob = ref(null)
const toast = useToast()

const props = defineProps({
  uploadService: {
    type: Function,
    required: true
  }
})

const changePreviewImage = (e) => {
  const file = e.target.files[0]
  if (file) {
    imagePreview.value = URL.createObjectURL(file)
  }
}

const uploadImage = (params = {}) => {
  console.log('Incredible')
  const blob = imageBlob.value.files[0]
  if (!blob) return

  return props.uploadService(blob, params)
    .then((response) => {
      if (response.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Image uploaded', life: 3000 })
        return response.data.resource
      } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error when uploading image', life: 3000 })
        return null
      }
    })
}

defineExpose({
  uploadImage,
  imageBlob
})
</script>
