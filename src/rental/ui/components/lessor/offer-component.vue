<template>
  <div class="offer__component">
    <h2>Offer Information</h2>
    <p><span class="fw-bold">Conditions:</span> {{ offer.conditions }}</p>
    <p class="offer__price">
      <span class="fw-bold">Price: </span>
      <span>{{ offer.amount.price }}</span>
      {{
          offer.amount.currency
      }}
    </p>
    <p>
      <span class="fw-bold">Status:</span>
      {{ offer.status }}
    </p>
    <p>
      <span class="fw-bold">Visibility:</span>
      {{ offer.visibility }}
    </p>
    <div>
      <p class="fw-bold">Stars:</p>
      <div class="offer__stars">
        <i class="pi pi-star-fill"></i>
        <p>5.00</p>
      </div>
    </div>
    <div class="offer__actions">
      <router-link :to="{ name: 'edit-offer-view', params: { id: route.params.id } }" class="button-primary">
        Editar
      </router-link>
      <a @click="handleChangeVisibility = !handleChangeVisibility" class="button-black">Change
        visibility</a>
    </div>
  </div>
  <div class="modal" v-if="handleChangeVisibility">
    <div class="modal__content">
      <h1>Are you sure you want to change visibility?</h1>
      <div class="modal__actions">
        <button @click="handleChangeVisibility = !handleChangeVisibility" class="button-black">Cancel</button>
        <button @click="changeOfferVisibility" class="button-primary">Change</button>
      </div>
    </div>
  </div>

  <Toast></Toast>
</template>

<style lang="scss">
.offer__component {
  margin-bottom: 2rem;

  .offer__stars {
    p {
      display: inline-block;
      margin-left: 1rem;
    }
  }

  .offer__actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    a {
      margin-top: 0;
    }
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import OffersService from '@/rental/services/offers-api.service'

const route = useRoute()
const handleChangeVisibility = ref(false)
const toast = useToast()

const props = defineProps({
  offer: {
    type: Object,
    required: true
  }
})

const changeOfferVisibility = () => {
  const visible = props.offer.visibility === 'VISIBLE'
  const offersService = new OffersService()
  offersService.changeOfferVisibility(route.params.id, visible)
    .then((response) => {
      console.log(response)
      /* eslint-disable-next-line */
      props.offer.visibility = response.data.resource.visibility
      toast.add({ severity: 'success', summary: 'Success', detail: 'Visibility changed', life: 3000 })
      handleChangeVisibility.value = false
    })
}

</script>
