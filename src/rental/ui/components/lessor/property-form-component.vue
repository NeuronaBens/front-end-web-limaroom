<template>
  <fieldset>
    <legend>Property Information</legend>
    <div class="input-group">
      <InputText class="input" type="text" v-model="property.title" required />
      <label>Title</label>
    </div>
    <div class="input-group">
      <InputText class="input" type="text" v-model="property.description" required />
      <label>Description</label>
    </div>
    <div class="" style="margin-bottom: 2rem;">
      <label>Property Type</label>
      <select v-model="property.propertyType">
        <option value="0" disabled>--- Select Property Type ---</option>
        <option
          v-for="propertyType in propertyTypes"
          v-bind:key="propertyType.key"
          :value="propertyType.key">
          {{propertyType.value}}
        </option>
      </select>
    </div>
    <div class="input-group">
      <InputText class="input" type="text" v-model="property.location" required />
      <label>Location</label>
    </div>
    <ImageInput ref="imageInputRef" :uploadService="assetsService.createAsset" />
  </fieldset>
</template>

<style lang="scss">

</style>

<script setup>
import { ref } from 'vue'
import ImageInput from '@/shared/ui/components/image-input-component.vue'
import AssetsService from '@/rental/services/assets-api.service'
import Property from '@/rental/domain/property.entity.js'
import PropertyTypes from '@/rental/domain/property-types.enum.js'

const capitalize = (str) => str.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')

const imageInputRef = ref(null)
const assetsService = new AssetsService()

const property = ref(new Property({ propertyType: 0 }))
const propertyTypes = Object.entries(PropertyTypes).map(([key, value]) => ({ key, value: capitalize(value) }))

const validate = () => {
  // return property.value.validate()
  return true
}

defineExpose({
  imageInputRef,
  property,
  validate
})
</script>
