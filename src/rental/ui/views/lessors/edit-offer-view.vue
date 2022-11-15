<template>
  <div class="container">
    <h1>Edit Offer</h1>
    <form @submit="onSubmit">
      <fieldset>
        <legend>Property Information</legend>
        <div class="input-group">
          <InputText class="input" type="text" v-model="property.title" required />
          <label>Title</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="offer.conditions" required />
          <label>Conditions</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="property.description" required />
          <label>Description</label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Price</legend>
        <div class="input-group">
          <InputText class="input" type="number" v-model="amount.price" required />
          <label>Price</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="amount.currency" required />
          <label>Currency</label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Offer information</legend>
        <div class="input-group">
          <InputText class="input" type="date" v-model="offer.lifecycle.endAt" required />
          <label>End Offer Date</label>
        </div>
      </fieldset>
      <button type="submit" class="button-primary">Save</button>
      <router-link :to="{ name: 'my-offer-detail-view', params: { id: route.params.id } }" class="button-black">Back</router-link>
    </form>

  </div>
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";
@import "@/shared/ui/assets/scss/_inputs.scss";

h1 {
  text-transform: uppercase;
}
fieldset {
  margin: 1rem 0;
  padding: 1.5rem 1rem;
  border-color: rgba($color: #000000, $alpha: 0.2);
  border-width: .1rem;
  legend {
    margin-bottom: 1rem;
    font-weight: $bold;
    text-transform: uppercase;
  }

  .input-group{
    @include input-group;
  }
}

</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import OffersService from '@/rental/services/offers-api.service'

const route = useRoute()

const offer = ref({
  lifecycle: {
    endAt: ''
  },
  conditions: ''
})

const amount = ref({
  price: 0,
  currency: ''
})

const property = ref({
  title: '',
  description: ''
})
const validateOffer = (data) => {
  return true
}

const onSubmit = (e) => {
  e.preventDefault()

  const data = {
    rentalOfferingResource: {
      ...offer.value,
      amount: amount.value
    },
    propertyResource: property.value
  }

  if (!validateOffer(data)) {
    console.log(data)
  }

  // TODO: Edit Offer Service Implemenation
}

onMounted(() => {
  const offersService = new OffersService()
  offersService.getOffer(route.params.id).then((response) => {
    const data = response.data.resource

    offer.value = {
      lifecycle: {
        endAt: data.lifecycle.endAt.split('T')[0]
      },
      conditions: data.conditions
    }
    amount.value = data.amount
    property.value = data.property
  })
})

</script>
