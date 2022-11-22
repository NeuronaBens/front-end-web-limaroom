<template>
  <div class="properties container">
    <div class="properties__title">
      <h1>My Properties</h1>
      <div class="divider"></div>
    </div>

    <div class="property__list">
      <OfferPreviewComponent v-for="offer in offers" v-bind:key="offer.id" :offer="offer"
        @click="goToOfferDetail(offer.id)" />
    </div>

    <router-link :to="{ name: 'create-offer-view', params: { id: route.params.id } }" class="button-primary">Create New
      Offer</router-link>
  </div>
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";

.properties {
  .properties__title {
    margin: 2rem 0;

    h1 {
      text-transform: uppercase;
    }

    .divider {
      margin: 0;
      background-color: rgba($color: #000000, $alpha: 0.2);
    }
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
import { useRoute, useRouter } from 'vue-router'

// Services
import OffersService from '@/rental/services/offers-api.service'

// Components
import OfferPreviewComponent from '@/rental/ui/components/offer-preview.component.vue'

const offers = ref([])
const route = useRoute()
const router = useRouter()

const goToOfferDetail = (id) => {
  router.push({ name: 'my-offer-detail-view', params: { id } })
}

onMounted(() => {
  const offersService = new OffersService()

  offersService.getAllByUserId(route.params.id).then((response) => {
    offers.value = response
  })
})

</script>
