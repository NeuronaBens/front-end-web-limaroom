<template>
  <div class="offers container">
    <h1>Look for your place</h1>
    <div class="divider"></div>
    <div class="offers__list">
      <OfferPreviewComponent v-for="offer in offers" :key="offer.id" :offer="offer" />
    </div>
  </div>
</template>

<style lang="scss">
.offers {
  padding: 2rem 0;

  .offers__list {
    padding: 2rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;
  }

  h1 {
    text-transform: uppercase;
  }

  .divider {
    margin: 0;
    background-color: rgba($color: #000000, $alpha: 0.2);
  }

}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import OffersService from '@/rental/services/offers-api.service'
import OfferPreviewComponent from '@/rental/ui/components/offer-preview.component.vue'
// import AssetsService from '../../services/assets-api.service'

const offers = ref([])

onMounted(() => {
  const offersService = new OffersService()

  offersService.getVisibles().then((response) => {
    offers.value = response
  })
})
</script>
