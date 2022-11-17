
<template>
  <div class="container">
    <h1>Create new Offer</h1>
    <form @submit="onSubmit">
      <fieldset>
        <legend>Property Information</legend>
        <div class="input-group">
          <InputText class="input" type="text" v-model="property.title" required />
          <label>Title</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="offer.conditions" required />
          <label>Conditions</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="property.description" required />
          <label>Description</label>
        </div>
        <!-- <div class="input-image">
          <label class="button-black">
            <input type="file" @change="changePreviewImage" ref="imageInput" />
            UPLOAD MAIN IMAGE
          </label>
          <img :src="image.urlImage" alt="" class="preview-image">
        </div> -->
        <ImageInput ref="imageInputRef" :uploadService="assetsService.createAsset" />
      </fieldset>

      <fieldset>
        <legend>Price</legend>
        <div class="input-group">
          <InputText class="input" type="number" v-model="amount.price" required />
          <label>Price</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="amount.currency" required />
          <label>Currency</label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Offer information</legend>
        <div class="input-group">
          <InputText class="input" type="date" v-model="offer.lifecycle.endAt" required />
          <label>End Offer Date</label>
        </div>
      </fieldset>
      <button type="submit" class="button-primary">Save</button>
      <router-link :to="{ name: 'my-offers-view', params: { id: route.params.id } }" class="button-black">Back
      </router-link>
    </form>
  </div>
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";
@import "@/shared/ui/assets/scss/_inputs.scss";

h1 {
  text-transform: uppercase;
}

fieldset {
  margin: 1rem 0;
  padding: 1.5rem 1rem;
  border-color: rgba($color: #000000, $alpha: 0.2);
  border-width: .1rem;

  legend {
    margin-bottom: 1rem;
    font-weight: $bold;
    text-transform: uppercase;
  }

  .input-group {
    @include input-group;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OffersService from '@/rental/services/offers-api.service'
import AssetsService from '@/rental/services/assets-api.service'
import ImageInput from '@/shared/ui/components/image-input-component.vue'

const route = useRoute()
const router = useRouter()
const imageInputRef = ref(null)
const assetsService = new AssetsService()
const offer = ref({
  lifecycle: {
    endAt: new Date().toISOString().split('T')[0]
  },
  conditions: ''
})

const amount = ref({
  price: 0,
  currency: ''
})

const property = ref({
  id: '',
  title: '',
  description: ''
})

const validateOffer = (data) => {
  return true
}

const onSubmit = (e) => {
  e.preventDefault()

  const data = {
    rentalOfferingResource: {
      ...offer.value,
      amount: amount.value
    },
    propertyResource: property.value
  }

  if (!validateOffer(data)) {
    return
  }

  if (!imageInputRef.value.imageBlob.files[0]) return

  const offersService = new OffersService()
  offersService.createOffer(data, route.params.id).then((response) => {
    if (response.data.resource) {
      const propertyId = response.data.resource.property.id

      imageInputRef.value.uploadImage({ id: propertyId })
        .then((response) => {
          if (response) {
            setTimeout(() => {
              router.push({ name: 'my-offers-view', params: { id: route.params.id } })
            }, 3000)
          }
        })
    }
  })
}

</script>
