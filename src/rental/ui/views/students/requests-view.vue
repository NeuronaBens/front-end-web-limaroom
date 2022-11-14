<template>
  <div class="container">
    <h1>Rental Requests</h1>
    <div class="rental-requests" v-for="request in requests" v-bind:key="request.id">

      <!-- TODO: Create Rental Request Component -->
      <div class="request">
        <p>Status: <span :style="{color: statusColors[request.status]}">{{ request.status }}</span></p>
        <p>Message: <span>{{ request.message }}</span></p>
        <p>Property: <span>{{ request.rentalOffering.property.title }}</span></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.rental-requests {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 2rem;
}

.request {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;

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
import { useRoute } from 'vue-router'
import RequestsService from '../../../services/requests-api.service'

const route = useRoute()
const requests = ref([])

const statusColors = {
  PENDING: '#c2a200',
  ACCEPTED: 'green',
  DECLINED: 'red'
}

onMounted(() => {
  const requestsService = new RequestsService()
  requestsService.getRequestsByUserId(route.params.id).then((response) => {
    requests.value = response.data.resource
    console.log(requests.value)
  })
})
</script>
