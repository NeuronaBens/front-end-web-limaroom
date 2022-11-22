<template>
  <div class="container request-view">
    <div>
      <h1>Rental Requests</h1>
      <p v-if="requests.length === 0">There's no rental requests right now</p>
      <div class="rental-requests">
        <RequestComponent v-for="request in requests" v-bind:key="request.id" :request="request" />
      </div>
    </div>
    <div class="divider"></div>
    <div>
      <RoommateRequestComponent />
    </div>
  </div>
</template>

<style lang="scss">
.request-view {
  .divider {
    border-bottom: 1px solid rgba(0, 0, 0, 0.425);
    margin: 3rem 0;
  }
}

.rental-requests {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 2rem;
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import RequestsService from '../../../services/requests-api.service'

import RoommateRequestComponent from '@/roommate/ui/components/roommate-requests-component.vue'
import RequestComponent from '@/rental/ui/components/request-component.vue'
const route = useRoute()
const requests = ref([])

onMounted(() => {
  const requestsService = new RequestsService()
  requestsService.getAllByUserId(route.params.id).then((response) => {
    requests.value = response
    console.log(requests.value)
  })
})
</script>
