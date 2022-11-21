<template>
  <div class="container">
    <div class="feature__assign">
      <div class="feature__assing__header">
        <h2>Select features your property has</h2>
        <div class="feature__assign__actions">
          <a class="button-primary" @click="onSubmit">Submit</a>
        </div>
      </div>
      <div class="divider"></div>
      <FeatureListComponent :handleSelected="true" :features="serviceFeatures" title="Services" ref="servicesRef" />
      <FeatureListComponent :handleSelected="true" :features="applianceFeatures" title="Appliance" ref="appliancesRef" />
      <FeatureListComponent :handleSelected="true" :features="termFeatures" title="Terms" ref="termsRef" />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/shared/ui/assets/scss/_buttons.scss';

.feature__assign {
  margin: 2rem 0;

  .feature__assing__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// Services
import PropertiesService from '@/rental/services/properties-api.service'
// Components
import FeatureListComponent from '@/rental/ui/components/feature-list.component.vue'
// Entities
import FEATURES from '@/rental/domain/enum/features.enum'

const router = useRouter()
const route = useRoute()

const serviceFeatures = Object.entries(FEATURES)
  .map(([_, value]) => (value))
  .filter((feature) => feature.type === 'service')

const applianceFeatures = Object.entries(FEATURES)
  .map(([_, value]) => (value))
  .filter((feature) => feature.type === 'appliance')

const termFeatures = Object.entries(FEATURES)
  .map(([_, value]) => (value))
  .filter((feature) => feature.type === 'term')

const servicesRef = ref(null)
const appliancesRef = ref(null)
const termsRef = ref(null)

const onSubmit = () => {
  const features = [
    ...servicesRef.value.selectedFeatures,
    ...appliancesRef.value.selectedFeatures,
    ...termsRef.value.selectedFeatures
  ]

  if (features.length === 0) {
    return
  }

  const propertyId = route.query.propertyId
  // console.log(propertyId)
  const propertiesService = new PropertiesService()
  propertiesService.assignFeatures(propertyId, features)
    .then(() => {
      router.push({ name: 'my-offer-detail-view', params: { id: route.params.id } })
    })
}

</script>
