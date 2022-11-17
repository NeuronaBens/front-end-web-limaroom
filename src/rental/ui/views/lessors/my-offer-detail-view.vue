<template>
  <div class="container">
    <div class="offer">
      <i class="pi pi-arrow-left icon" @click="goBackToOffers"></i>
      <PropertyComponent :property="property" />

      <div class="d-grid">
        <OfferComponent :offer="offer" />
        <div>
          <h2>Requests</h2>
          <div class="offer-requests" v-for="request in requests" v-bind:key="request.id">
            <div class="offer-request">
              <p>Status: <span :style="{ color: statusColors[request.status], fontWeight: 'bold' }">{{ request.status
              }}</span></p>
              <p>Message: <span>{{ request.message }}</span></p>
              <p>User Name: <span>{{ request.studentProfile.name }} {{ request.surname }}</span></p>
              <button @click="acceptRequest(request.id)" class="button-primary">Accept</button>
              <button @click="declineRequest(request.id)" class="button-black">Decline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Toast></Toast>
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
import { useToast } from 'primevue/usetoast'
import { userStore } from '@/shared/config/store'

import OffersService from '@/rental/services/offers-api.service'
import RequestsService from '@/rental/services/requests-api.service'

import PropertyComponent from '@/rental/ui/components/lessor/property-component.vue'
import Property from '@/rental/domain/property.entity'

import OfferComponent from '@/rental/ui/components/lessor/offer-component.vue'
import Offer from '@/rental/domain/offer.entity'

const route = useRoute()
const router = useRouter()
const offer = ref(new Offer({}))
const property = ref(new Property({}))

const requests = ref([])
const toast = useToast()

const currentUser = userStore()

const statusColors = {
  PENDING: '#c2a200',
  ACCEPTED: 'green',
  DECLINED: 'red'
}

const acceptRequest = (id) => {
  const requestsService = new RequestsService()
  requestsService.acceptRequest(id)
    .then(() => {
      toast.add({ severity: 'success', summary: 'Request accepted correctly', life: 3000 })
      getOfferRequests()
        .then((response) => {
          requests.value = response
        })
    })
    .catch(() => {
      toast.add({ severity: 'error', summary: 'Error accepting request', life: 3000 })
    })
}

const declineRequest = (id) => {
  const requestsService = new RequestsService()
  requestsService.declineRequest(id)
    .then(() => {
      toast.add({ severity: 'success', summary: 'Request declined correctly', life: 3000 })
      getOfferRequests()
        .then((response) => {
          requests.value = response
        })
    })
    .catch(() => {
      toast.add({ severity: 'error', summary: 'Error declining request', life: 3000 })
    })
}

const getOfferRequests = () => {
  const requestsService = new RequestsService()
  return requestsService.getRequestsByOfferId(route.params.id).then((response) => {
    requests.value = response.data.resource
  })
}

const goBackToOffers = () => {
  router.push({ name: 'my-offers-view', params: { id: currentUser.state.user.id } })
}

onMounted(() => {
  const offersService = new OffersService()
  offersService.getOffer(route.params.id).then((response) => {
    offer.value = response.data.resource
    property.value = response.data.resource.property
  })
  getOfferRequests()
})
</script>
