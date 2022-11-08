<template>
  <div class="container">
    <div class="offer">
      <div class="offer__header">
        <div class="offer__title">
          <h1>Beautiful House at City</h1>
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
          <p><span class="fw-bold">Conditions:</span> {{ offer.conditions }}</p>
        </div>
        <div class="offer__extra">
          <p class="offer__price">
            <span class="fw-bold">Price: </span>
            <span>{{ amount ? amount.price : '' }}</span>
            {{
                amount ? amount.currency : ''
            }}
          </p>
          <div>
            <p class="fw-bold">Stars:</p>
            <div class="offer__stars">
              <i class="pi pi-star-fill"></i>
              <p>5.00</p>
            </div>
          </div>

        </div>
      </div>

      <div class="offer__actions">
        <button @click="editOffer" class="button-primary">Editar</button>
        <button @click="addImage" class="button-primary">Añadir Imagenes</button>
        <button @click="handleDelete = !handleDelete" class="button-black">Eliminar</button>
      </div>

      <div class="divider offer__requets__divider"></div>

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

  <div class="modal" v-if="handleDelete">
    <div class="modal__content">
      <h1>Are you sure you want to delete offer?</h1>
      <div class="modal__actions">
        <button @click="handleDelete = !handleDelete" class="button-black">Cancel</button>
        <button @click="deleteOffer" class="button-primary">Delete</button>
      </div>
    </div>
  </div>

  <Toast></Toast>
</template>

<style lang="scss">
@import '@/shared/ui/assets/scss/_buttons.scss';

.offer {
  margin-top: 1rem;

  .offer__requets__divider {
    width: 95%;
    margin: 2rem auto;
    background-color: rgba($color: #000000, $alpha: 0.2);
  }
}

.offer__stars {
  p {
    display: inline-block;
    margin-left: 1rem;
  }
}

.offer__assets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 1rem;

  .offer__asset {
    border-radius: 1rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.offer__footer {
  margin-bottom: 2rem;
}

.offer__actions {
  button {
    margin-right: 1rem;
    margin-top: 0;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  .modal__content {
    background-color: $white;
    padding: 2rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      text-align: center;
    }

    .modal__actions {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;

      button {
        margin-right: 1rem;
      }
    }
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

const statusColors = {
  PENDING: '#c2a200',
  ACCEPTED: 'green',
  DECLINED: 'red'
}

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
    assets.value = response.data.property.assets
  })
  getOfferRequests()
    .then((response) => {
      requests.value = response
    })
})
</script>
