<template>
  <div class="properties">
    <h1>My Properties</h1>
    <OfferComponent v-for="offer in offers" v-bind:key="offer.id" :offer="offer" @click="goToOfferDetail(offer.id)"/>

    <router-link :to="{ name: 'create-offer-view', params: { id: route.params.id } }" class="button-primary">Create New Offer</router-link>
  </div>
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";
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
