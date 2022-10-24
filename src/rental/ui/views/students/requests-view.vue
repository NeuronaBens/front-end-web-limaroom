<template>
  <h1>Requests</h1>
</template>

<style lang="scss">
</style>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RequestsService from '../../../services/requests-api.service'

const route = useRoute()

onMounted(() => {
  const requestsService = new RequestsService()
  requestsService.getRequestByUserId(route.params.id).then((response) => {
    console.log(response.data)
  })
})
</script>
