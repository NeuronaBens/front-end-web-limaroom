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
      <Button
        text="edit"
        :to="{ name: 'edit-offer-view', params: { id: route.params.id } }"
      />
      <Button text="change visibility" color="secondary" @click="handleChangeVisibility = !handleChangeVisibility" />
    </div>
  </div>
  <div class="modal" v-if="handleChangeVisibility">
    <div class="modal__content">
      <h1>Are you sure you want to change visibility?</h1>
      <div class="modal__actions">
        <Button text="cancel" color="secondary" @click="handleChangeVisibility = !handleChangeVisibility"/>
        <Button text="change" :loader="changing" @click="changeOfferVisibility" />
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
// Services
import OffersService from '@/rental/services/offers-api.service'
// Components
import Button from '@/shared/ui/components/button.component.vue'

const route = useRoute()
const handleChangeVisibility = ref(false)
const toast = useToast()
const changing = ref(false)

const props = defineProps({
  offer: {
    type: Object,
    required: true
  },
  changeVisibility: {
    type: Function,
    required: true
  }
})

const changeOfferVisibility = () => {
  const visible = props.offer.visibility === 'VISIBLE'
  const offersService = new OffersService()
  changing.value = true
  offersService.changeVisibility(route.params.id, visible)
    .then((response) => {
      props.changeVisibility(response.visibility)
      toast.add({ severity: 'success', summary: 'Success', detail: 'Visibility changed', life: 3000 })
      handleChangeVisibility.value = false
    })
    .catch(() => {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Visibility not changed', life: 3000 })
    })
    .finally(() => {
      changing.value = false
    })
}

</script>
