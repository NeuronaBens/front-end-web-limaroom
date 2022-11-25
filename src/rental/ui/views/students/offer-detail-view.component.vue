<template>
  <div class="container">
    <OfferDetailLoading v-if="loading"></OfferDetailLoading>
    <div v-else class="offer__header">
      <PropertyComponent :property="property"/>

      <div class="offer__footer">
        <OfferComponent :offer="offer" :owner="ownerProfile"/>
        <OfferRequestComponent :offer="offer"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.offer__header {
  padding: 2rem 0;

  .offer__footer {
    @include grid(2, 4rem);
    grid-template-columns: calc(60% - 4rem) 40%;
  }
}

</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
// Services
import OffersService from '@/rental/services/offers-api.service'
// Components
import PropertyComponent from '@/rental/ui/components/student/property.component.vue'
import OfferComponent from '@/rental/ui/components/student/offer.component.vue'
import OfferRequestComponent from '@/rental/ui/components/student/offer-request.component.vue'
import OfferDetailLoading from '@/shared/ui/components/loaders/offer-detail-loading.component.vue'
// Entities
import Property from '@/rental/domain/entity/property.entity'
import Offer from '@/rental/domain/entity/offer.entity'
import Profile from '@/profile/domain/profile.entity'

const route = useRoute()
const offer = ref(new Offer({}))
const property = ref(new Property({}))
const ownerProfile = ref(new Profile({}))
const loading = ref(true)

onMounted(() => {
  const offersService = new OffersService()

  offersService.getById(route.params.id).then((response) => {
    offer.value = response
    property.value = new Property(response.property)
    ownerProfile.value = new Profile(response.property.profile)
    loading.value = false
  })
})
</script>
