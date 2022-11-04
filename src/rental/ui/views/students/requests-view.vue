<template>
  <div class="user__requests">
    <h1>Requests</h1>
    <div class="user-request" v-for="request in requests" v-bind:key="request.id">
      <p>Status: {{ request.status }}</p>
      <p>Message: {{ request.message }}</p>
      <p>User Name: {{ request.studentProfile.name }} {{ request.surname }}</p>
    </div>
  </div>
</template>

<style lang="scss">

</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import RequestsService from '../../../services/requests-api.service'

const route = useRoute()
const requests = ref([])

onMounted(() => {
  const requestsService = new RequestsService()
  requestsService.getRequestsByUserId(route.params.id).then((response) => {
    requests.value = response.data
  })
})
</script>
