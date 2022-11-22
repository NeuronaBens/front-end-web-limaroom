<template>
  <div class="container">
    <div class="offer">
      <i class="pi pi-arrow-left icon" @click="goBackToOffers"></i>
      <PropertyComponent :property="property" :refreshAssetList="refreshAssetList"/>
      <div class="divider"></div>
      <div class="d-grid">
        <OfferComponent :offer="offer" :changeVisibility="changeVisibility"/>
        <div class="requests">
          <h2>Requests</h2>
          <div class="offer-requests">
            <RequestComponent v-for="request in requests" v-bind:key="request.id" :request="request" @refresh="refreshRequest"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/shared/ui/assets/scss/_buttons.scss';

.offer {
  margin: 2rem 0;

  .d-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
  }

  i {
    cursor: pointer;
  }
}

.offer-requests {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 2rem;
}

.offer-request {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;

  .request__status {
    font-weight: $bold;
  }

  .request__name {
    text-align: center;
  }

  p {
    font-weight: $bold;
    text-align: center;

    span {
      font-weight: $regular;
    }
  }
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userStore } from '@/shared/infraestructure/store'
// Services
import OffersService from '@/rental/services/offers-api.service'
import RequestsService from '@/rental/services/requests-api.service'
// Components
import PropertyComponent from '@/rental/ui/components/lessor/property.component.vue'
import OfferComponent from '@/rental/ui/components/lessor/offer.component.vue'
import RequestComponent from '@/rental/ui/components/request.component.vue'
// Entities
import Property from '@/rental/domain/entity/property.entity'
import Offer from '@/rental/domain/entity/offer.entity'

const route = useRoute()
const router = useRouter()
const offer = ref(new Offer({}))
const property = ref(new Property({}))

const requests = ref([])

const currentUser = userStore()

const refreshAssetList = (assets) => {
  property.value.assets.push(...assets)
}

const changeVisibility = (visibility) => {
  offer.value.visibility = visibility
}

const getOfferRequests = () => {
  const requestsService = new RequestsService()
  return requestsService.getAllByOfferId(route.params.id).then((response) => {
    requests.value = response
  })
}

const refreshRequest = (newRequest) => {
  requests.value = requests.value.map((request) => {
    if (newRequest.id === request.id) {
      return newRequest
    }
    return request
  })
}

const goBackToOffers = () => {
  router.push({ name: 'my-offers-view', params: { id: currentUser.state.user.id } })
}

onMounted(() => {
  const offersService = new OffersService()
  offersService.getById(route.params.id).then((response) => {
    offer.value = response
    property.value = new Property(offer.value.property)
  })
  getOfferRequests()
})
</script>
