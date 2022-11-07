<template>
  <div>
    <p>{{ status }}</p>
    <div v-if="actions">
      <p>{{ requestor.name }} {{ requestor.surname}}</p>

      <div class="actions">
        <button @click="acceptRequest">Accept</button>
        <button @click="declineRequest">Decline</button>
      </div>
    </div>
    <div v-else>
      <p>{{ requested.name }} {{ requested.surname }}</p>
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script setup>
import { onMounted, ref } from 'vue'
import RequestsService from '@/roommate/services/request-api.service.js'
const requestor = ref({})
const requested = ref({})
const status = ref('')

const props = defineProps({
  request: {
    type: Object,
    required: true
  },
  actions: {
    type: Boolean,
    required: true
  }
})

const acceptRequest = () => {
  const requestsService = new RequestsService()
  requestsService.acceptRequest(props.request.id)
    .then((response) => {
      status.value = response.data.resource.status
    })
    .catch((error) => {
      console.log(error)
    })
  console.log('Accepting request...')
}

const declineRequest = () => {
  const requestsService = new RequestsService()
  requestsService.declineRequest(props.request.id)
    .then((response) => {
      status.value = response.data.resource.status
    })
    .catch((error) => {
      console.log(error)
    })
  console.log('Declining request...')
}

onMounted(() => {
  requestor.value = props.request.studentRequestor
  requested.value = props.request.studentRequested
  status.value = props.request.status
})

</script>
