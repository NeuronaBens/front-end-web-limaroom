<template>
  <h3>Want to enroll the team?</h3>
  <p>Send them a request!</p>
  <Button
    text="send request"
    :loader="sending"
    @click="sendRequest"
  />
  <Toast />
</template>

<style lang="scss">

</style>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter, useRoute } from 'vue-router'
import { userStore } from '@/shared/infraestructure/store'
// Services
import TeamRequestsService from '@/coexistance/services/team-requests-api.service'
// Components
import Button from '@/shared/ui/components/button.component.vue'

const toast = useToast()
const router = useRouter()
const route = useRoute()
const currentUser = userStore()
const sending = ref(false)

const sendRequest = () => {
  const teamRequestsService = new TeamRequestsService()
  const userId = currentUser.state.user.id
  const teamId = route.params.id
  sending.value = true
  teamRequestsService.create(userId, teamId)
    .then(() => {
      toast.add({ severity: 'success', summary: 'Request sended correctly', life: 2000 })

      setTimeout(() => {
        router.push({ name: 'teams-view' })
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
