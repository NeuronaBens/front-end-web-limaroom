<template>
  <div class="roommate__requests">
    <h2>Roommate Requests</h2>
    <div class="requests">
      <h3>My request</h3>
      <LoadingComponent v-if="allLoaded" height="10rem" :single="true" :rows="1"></LoadingComponent>
      <div v-else>
        <p v-if="myRequests.length === 0">There's no requests rigth now</p>
        <div class="request__list">
          <RequestComponent v-for="request in myRequests" v-bind:key="request.id" :request="request" :actions="false" />
        </div>
      </div>
    </div>
    <div class="requests">
      <h3>Requests for me</h3>
      <LoadingComponent v-if="allLoaded" height="10rem" :single="true" :rows="1"></LoadingComponent>
      <div v-else>
        <p v-if="requestsForMe.length === 0">There's no requests rigth now</p>
        <div class="request__list">
          <RequestComponent v-for="request in requestsForMe" v-bind:key="request.id" :request="request"
            :actions="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.roommate__requests {
  h2 {
    text-transform: uppercase;
  }

  .requests {
    margin-bottom: 1.5rem;
  }

  .request__list {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;
  }
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { userStore } from '@/shared/infraestructure/store'
// Services
import RequestsService from '@/roommate/services/request-api.service.js'
// Components
import RequestComponent from '@/roommate/ui/components/request.component.vue'
import LoadingComponent from '@/shared/ui/components/loaders/list-loading.component.vue'

const myRequests = ref([])
const requestsForMe = ref([])
const currentUser = userStore()
const loading = ref([true, true])

const emit = defineEmits(['loaded'])

defineProps({
  allLoaded: {
    type: Boolean,
    required: true
  }
})

const changeLoading = (index) => {
  loading.value[index] = false
  if (loading.value.every(v => v)) {
    emit('loaded')
  }
}

onMounted(() => {
  const requestsService = new RequestsService()
  requestsService.getMyRequests(currentUser.state.user.id)
    .then((response) => {
      myRequests.value = response
      changeLoading(0)
    })
    .catch((error) => {
      console.log(error)
    })

  requestsService.getRequestsForMe(currentUser.state.user.id)
    .then((response) => {
      requestsForMe.value = response
      changeLoading(1)
    })
    .catch((error) => {
      console.log(error)
    })
})

</script>
