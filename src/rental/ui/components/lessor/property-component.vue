<template class="property">
  <div class="property__header">
    <div class="property__title">
      <h1>{{ property.title }}</h1>
    </div>
    <p class="property__location">{{ property.location }}</p>
  </div>

  <!-- TODO: Change to a component, create default layout and slider -->
  <div class="property__assets">
    <div class="property__asset" v-for="asset in property.assets" v-bind:key="asset.url">
      <img :src="asset.urlImage" alt="">
    </div>
  </div>
  <a @click="handleUploadImage = !handleUploadImage" class="button-primary">Añadir Imagenes</a>
  <div class="divider"></div>

  <div class="property__description">
    <h2>Description</h2>
    <p>{{ property.description }}</p>
  </div>

  <div class="property__features">
    <h2>Features</h2>
    <router-link
      v-if="!haveFeatures"
      :to="{ name: 'assign-features-view', params: { id: route.params.id }, query: { propertyId: property.id} }"
      class="button-primary">
      Add Features
    </router-link>
    <div v-else>
      <FeatureListComponent :handleSelected="false" :features="formatFeatures"/>
    </div>
  </div>

  <div class="modal" v-if="handleUploadImage">
    <div class="modal__content">
      <h1>Upload your image</h1>
      <ImageInput ref="imageInputRef" :uploadService="assetsService.create" />
      <div class="modal__actions">
        <button @click="handleUploadImage = !handleUploadImage" class="button-black">Cancel</button>
        <button @click="uploadImage" class="button-primary">Upload</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.property__assets {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;

  .property__asset {
    border-radius: 1rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
// Services
import AssetsService from '@/rental/services/assets-api.service'
// Components
import ImageInput from '@/shared/ui/components/image-input-component.vue'
import FeatureListComponent from '@/rental/ui/components/feature-list.component.vue'
// Entities
import FEATURES from '@/rental/domain/enum/features.enum'

const route = useRoute()
const assetsService = new AssetsService()
const imageInputRef = ref(null)
const handleUploadImage = ref(false)

const props = defineProps({
  property: {
    type: Object,
    required: true
  },
  refreshAssetList: {
    type: Function,
    required: true
  }
})

const haveFeatures = computed(() => {
  return props.property.features.length > 0
})

const formatFeatures = computed(() => {
  return props.property.features.map(({ id, feature }) => {
    return {
      name: feature.name,
      icon: Object.entries(FEATURES).filter(([key, value]) => value.name === feature.name)[0][1].icon
    }
  })
})

const uploadImage = () => {
  if (!imageInputRef.value.imageBlob.files[0]) {
    console.log('No image')
    return
  }
  imageInputRef.value.uploadImage({ id: props.property.id })
    .then((response) => {
      props.refreshAssetList(response)
      handleUploadImage.value = !handleUploadImage.value
    })
}

</script>
