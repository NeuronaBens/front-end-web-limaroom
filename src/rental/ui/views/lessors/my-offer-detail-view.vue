<template>
  <div class="container">
    <div class="offer">
      <div class="offer__header">
        <div class="offer__title">
          <h1>Beautiful House at City</h1>
        </div>
        <div class="offer__stars">
          <i class="pi pi-star-fill"></i>
          <p>5.00</p>
        </div>
        <p class="offer__location">Lima, Peru</p>
      </div>

      <div class="offer__assets">
        <div class="offer__asset" v-for="asset in assets" v-bind:key="asset.url">
          <img :src="asset.urlImage" alt="">
        </div>
      </div>

      <div class="offer__footer">
        <div class="offer__description">
          <h2>Descripción</h2>
          <p>{{ property.description }}</p>
          <div class="divider"></div>
          <h2>Aditional Information</h2>
          <p>{{ offer.conditions }}</p>
        </div>
        <div class="offer__extra">
          <p class="offer__price">
            <span>{{ amount ? amount.price : '' }}</span>
            {{
    amount ? amount.currency : ''
            }}
          </p>
          <div class="offer__stars">
            <i class="pi pi-star-fill"></i>
            <p>5.00</p>
          </div>
        </div>
      </div>

      <div class="offer__actions">
        <button @click="editOffer">Editar</button>
        <button @click="addImage">Añadir Imagenes</button>
        <button @click="handleDelete = !handleDelete">Eliminar</button>
      </div>

      <div class="offer__requests">
        <h2>Requests</h2>
        <div class="offer-request" v-for="request in requests" v-bind:key="request.id">
          <p>Status: {{request.status}}</p>
          <p>Message: {{request.message}}</p>
          <p>User Name: {{request.studentProfile.name}} {{request.surname}}</p>
          <button @click="acceptRequest(request.id)">Accept</button>
          <button @click="declineRequest(request.id)">Decline</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="handleDelete">
    <div class="modal">
      <div class="modal__content">
        <h1>Are you sure you want to delete offer?</h1>
        <div class="modal__actions">
          <button @click="handleDelete = !handleDelete">Cancel</button>
          <button @click="deleteOffer">Delete</button>
        </div>
      </div>
    </div>
  </div>

  <Toast></Toast>
</template>

<style lang="scss">
.offer__stars {
  p {
    display: inline-block;
    margin-left: 1rem;
  }
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OffersService from '@/rental/services/offers-api.service'
import RequestsService from '@/rental/services/requests-api.service'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const offer = ref({})
const amount = ref({})
const property = ref({})
const assets = ref([])
const handleDelete = ref(false)

const requests = ref([])
const toast = useToast()

const addImage = () => {
  console.log('add image')
}

const editOffer = () => {
  console.log(route.params.id)
  router.push({ name: 'edit-offer-view', params: { id: route.params.id } })
}

const deleteOffer = () => {
  console.log('delete')
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
    return response.data
  })
}

onMounted(() => {
  const offersService = new OffersService()
  offersService.getOffer(route.params.id).then((response) => {
    offer.value = response.data
    amount.value = response.data.amount
    property.value = response.data.property
    assets.value = response.data.property.propertyAssets
  })
  getOfferRequests()
    .then((response) => {
      requests.value = response
    })
})
</script>
