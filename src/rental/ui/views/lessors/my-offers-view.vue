<template>
  <div class="properties container">
    <h1>My Properties</h1>
    <div class="property__list">
      <OfferComponent v-for="offer in offers" v-bind:key="offer.id" :offer="offer" @click="goToOfferDetail(offer.id)" />
    </div>

    <router-link :to="{ name: 'create-offer-view', params: { id: route.params.id } }" class="button-primary">Create New
      Offer</router-link>
  </div>
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";

.properties {
  h1 {
    text-transform: uppercase;
    margin: 2rem 0;
  }

  .property__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;
  }

}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import OffersService from '@/rental/services/offers-api.service'
import { useRoute, useRouter } from 'vue-router'
import OfferComponent from '@/rental/ui/components/offer-component.vue'

const offers = ref([])
const route = useRoute()
const router = useRouter()
const goToOfferDetail = (id) => {
  router.push({ name: 'my-offer-detail-view', params: { id } })
}

onMounted(() => {
  const offersService = new OffersService()

  offersService.getOffersByUserId(route.params.id).then((response) => {
    offers.value = response.data
  })
})

</script>
