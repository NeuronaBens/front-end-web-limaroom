<template>
  <h2>Send a roommate request</h2>
  <button @click="sendRequest">Send now!</button>
</template>

<style lang="scss">
</style>

<script setup>
import RequestsService from '@/roommate/services/request-api.service'

const props = defineProps({
  request: {
    type: Object,
    required: true
  }
})

const sendRequest = () => {
  const requestsService = new RequestsService()
  requestsService.createRequest(props.request)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  console.log('Sending request...')
}

</script>
