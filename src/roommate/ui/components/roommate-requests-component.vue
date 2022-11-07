<template>
  <h1>Roommate Requests</h1>
  <div>
    <h2>My request</h2>
    <p v-if="myRequests.length === 0">There's no requests rigth now</p>
    <RequestComponent v-for="request in myRequests" v-bind:key="request.id" :request="request" :actions="false" />
  </div>
  <div>
    <h2>Requests for me</h2>
    <p v-if="requestsForMe.length === 0">There's no requests rigth now</p>
    <RequestComponent v-for="request in requestsForMe" v-bind:key="request.id" :request="request" :actions="true"/>
  </div>
</template>

<style lang="scss">
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { userStore } from '@/shared/config/store'
import RequestsService from '@/roommate/services/request-api.service.js'
import RequestComponent from '@/roommate/ui/components/request-component.vue'

const myRequests = ref([])
const requestsForMe = ref([])
const currentUser = userStore()

onMounted(() => {
  const requestsService = new RequestsService()
  requestsService.getMyRequests(currentUser.state.user.id)
    .then((response) => {
      myRequests.value = response.data.resource
    })
    .catch((error) => {
      console.log(error)
    })
  requestsService.getRequestsForMe(currentUser.state.user.id)
    .then((response) => {
      requestsForMe.value = response.data.resource
    })
    .catch((error) => {
      console.log(error)
    })
})

</script>
