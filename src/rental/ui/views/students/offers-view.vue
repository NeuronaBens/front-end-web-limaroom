<template>
  <div class="offers">
    <div class="offers__list">
      <OfferPreviewComponent v-for="offer in offers" :key="offer.id" :offer="offer" />
    </div>
  </div>
</template>

<style lang="scss">
.offers {
  padding: 3rem 10rem;

  .offers__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;
  }
}
</style>

<script setup>
import OfferPreviewComponent from '@/rental/ui/components/offer-preview-component.vue'
import { onMounted, ref } from 'vue'
import OffersService from '@/rental/services/offers-api.service'
// import AssetsService from '../../services/assets-api.service'

const offers = ref([])

onMounted(() => {
  const offersService = new OffersService()

  offersService.getOffers().then((response) => {
    offers.value = response.data.resource
  })
})
</script>
