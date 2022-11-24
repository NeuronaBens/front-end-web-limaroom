<template>
  <div class="features__wrapper">
    <h3>{{ title }}</h3>
    <div class="features">
      <FeatureComponent
        @toggle="onFeatureToggle"
        v-for="feature in features"
        v-bind:key="feature.key"
        :feature="feature"
        :handleSelected="handleSelected"
      />
    </div>
  </div>

</template>

<style lang="scss">
.features {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 2rem;

}
</style>

<script setup>
/* eslint-disable */
import FeatureComponent from '@/rental/ui/components/feature.component.vue'

defineProps({
  features: {
    type: Array,
    required: true
  },
  title: {
    type: String
  },
  handleSelected: {
    type: Boolean,
    required: true
  }
})

const selectedFeatures = []

const onFeatureToggle= (feature) => {
  const index = selectedFeatures.indexOf(feature)
  index === -1 ? selectedFeatures.push(feature) : selectedFeatures.splice(index, 1)
}

defineExpose({
  selectedFeatures
})
</script>
