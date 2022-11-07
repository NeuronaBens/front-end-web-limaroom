<template>
  <div class="request__form">
    <h3>Want him/her to be your roommate?</h3>
    <p>Send him/her a request!</p>
    <button @click="sendRequest" class="button-primary">Send Request</button>
  </div>
</template>

<style lang="scss">
@import '@/shared/ui/assets/scss/_buttons.scss';

.request__form {
  text-align: center;
}
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
