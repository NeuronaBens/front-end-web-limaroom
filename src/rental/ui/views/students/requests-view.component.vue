<template>
  <div class="container request-view">
    <div>
      <h1>Rental Requests</h1>
      <LoadingComponent height="20rem" :rows="1" :single="true" v-if="allLoaded"></LoadingComponent>
      <div v-else>
        <p v-if="requests.length === 0">There's no rental requests right now</p>
        <div class="rental-requests">
          <RequestComponent v-for="request in requests" v-bind:key="request.id" :request="request" />
        </div>
      </div>

    </div>
    <div class="divider"></div>
    <RoommateRequestComponent @loaded="onRoommateRequestLoaded" :allLoaded="allLoaded"/>
  </div>
</template>

<style lang="scss">
.request-view {
  .divider {
    border-bottom: 1px solid rgba(0, 0, 0, 0.425);
    margin: 3rem auto;
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
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
// Services
import RequestsService from '@/rental/services/requests-api.service'
// Component
import RoommateRequestComponent from '@/roommate/ui/components/roommate-requests.component.vue'
import RequestComponent from '@/rental/ui/components/request.component.vue'
import LoadingComponent from '@/shared/ui/components/loaders/list-loading.component.vue'

const route = useRoute()
const requests = ref([])
const rentalRequestLoading = ref(true)
const roommateRequestLoading = ref(true)

const allLoaded = computed(() => {
  return rentalRequestLoading.value && roommateRequestLoading.value
})

const onRoommateRequestLoaded = () => {
  roommateRequestLoading.value = false
}

onMounted(() => {
  const requestsService = new RequestsService()
  requestsService.getAllByUserId(route.params.id).then((response) => {
    requests.value = response
    rentalRequestLoading.value = false
  })
})
</script>
