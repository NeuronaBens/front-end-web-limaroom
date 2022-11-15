<template>
  <div class="container">
    <div>
      <h1>Rental Requests</h1>
      <p v-if="requests.length === 0">There's no rental requests right now</p>
      <div class="rental-requests" v-for="request in requests" v-bind:key="request.id">

        <!-- TODO: Create Rental Request Component -->
        <div class="request">
          <p>Status: <span :style="{ color: statusColors[request.status] }">{{ request.status }}</span></p>
          <p>Message: <span>{{ request.message }}</span></p>
          <p>Property: <span>{{ request.rentalOffering.property.title }}</span></p>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div>
      <RoommateRequestComponent />
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

.divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.425);
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import RoommateRequestComponent from '@/roommate/ui/components/roommate-requests-component.vue'
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
  })
})
</script>
