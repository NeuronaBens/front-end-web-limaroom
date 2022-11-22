<template>
  <h3>Want to enroll the team?</h3>
  <p>Send them a request!</p>
  <button @click="sendRequest" class="button-primary">Send Request</button>
  <Toast />
</template>

<style lang="scss">

</style>

<script setup>
import { useToast } from 'primevue/usetoast'
import { useRouter, useRoute } from 'vue-router'
import { userStore } from '@/shared/config/store'
// Services
import TeamRequestsService from '@/coexistance/services/team-requests-api.service'

const toast = useToast()
const router = useRouter()
const route = useRoute()
const currentUser = userStore()

const sendRequest = () => {
  const teamRequestsService = new TeamRequestsService()
  const userId = currentUser.state.user.id
  const teamId = route.params.id
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
}

</script>
