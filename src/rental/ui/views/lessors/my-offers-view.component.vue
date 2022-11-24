<template>
  <div class="properties container">
    <div class="properties__title">
      <h1>My Properties</h1>
      <div class="divider"></div>
    </div>

    <LoadingComponent v-if="loading"></LoadingComponent>
    <div v-else>
      <div class="property__list">
        <OfferPreviewComponent v-for="offer in offers" v-bind:key="offer.id" :offer="offer"
          @click="goToOfferDetail(offer.id)" />
      </div>

      <Button text="create new offer" :to="{ name: 'create-offer-view', params: { id: route.params.id } }" />
    </div>

  </div>
</template>

<style lang="scss">
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
import Button from '@/shared/ui/components/button.component.vue'
import LoadingComponent from '@/shared/ui/components/loaders/list-loading.component.vue'

const offers = ref([])
const route = useRoute()
const router = useRouter()
const loading = ref(true)

const goToOfferDetail = (id) => {
  router.push({ name: 'my-offer-detail-view', params: { id } })
}

onMounted(() => {
  const offersService = new OffersService()

  offersService.getAllByUserId(route.params.id).then((response) => {
    offers.value = response
    loading.value = false
  })
})

</script>
