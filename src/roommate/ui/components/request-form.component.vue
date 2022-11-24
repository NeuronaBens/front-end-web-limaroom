<template>
  <div class="request__form">
    <h3>Want him/her to be your roommate?</h3>
    <p>Send him/her a request!</p>
    <Button
      text="send request"
      :loader="sending"
      @click="sendRequest"
    />
    <Toast />
  </div>
</template>

<style lang="scss">

.request__form {
  text-align: center;
}
</style>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter, useRoute } from 'vue-router'
import { userStore } from '@/shared/infraestructure/store'
// Services
import RequestsService from '@/roommate/services/request-api.service'
// Components
import Button from '@/shared/ui/components/button.component.vue'

const toast = useToast()
const router = useRouter()
const route = useRoute()
const currentUser = userStore()
const sending = ref(false)

const sendRequest = () => {
  const requestsService = new RequestsService()
  const requestorId = currentUser.state.user.id
  const requestedId = route.params.id

  sending.value = true
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
    .finally(() => {
      sending.value = false
    })
}

</script>
