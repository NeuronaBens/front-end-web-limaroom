<template>
  <div class="request__form">
    <h3>Want him/her to be your roommate?</h3>
    <p>Send him/her a request!</p>
    <button @click="sendRequest" class="button-primary">Send Request</button>
    <Toast />
  </div>
</template>

<style lang="scss">
@import '@/shared/ui/assets/scss/_buttons.scss';

.request__form {
  text-align: center;
}
</style>

<script setup>
import { useToast } from 'primevue/usetoast'
import { useRouter, useRoute } from 'vue-router'
import { userStore } from '@/shared/infraestructure/store'
// Services
import RequestsService from '@/roommate/services/request-api.service'

const toast = useToast()
const router = useRouter()
const route = useRoute()
const currentUser = userStore()

const sendRequest = () => {
  const requestsService = new RequestsService()
  const requestorId = currentUser.state.user.id
  const requestedId = route.params.id
  requestsService.create(requestorId, requestedId)
    .then(() => {
      toast.add({ severity: 'success', summary: 'Request sended correctly', life: 2000 })

      setTimeout(() => {
        router.push({ name: 'roommates-view' })
      }, 2000)
    })
    .catch((error) => {
      toast.add({ severity: 'error', summary: 'Error when sending request', detail: error.message, life: 3000 })
    })
}

</script>
