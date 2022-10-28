<template>
  <h1>This is my profile</h1>
  <p>{{profile.name}}</p>
  <p>{{profile.surname}}</p>
  <p>{{profile.phone.code}} {{profile.phone.number}}</p>
</template>

<style lang="scss">
</style>

<script setup>
import { onMounted, ref } from 'vue'
import ProfilesService from '@/profile/services/profiles-api.service.js'
import Profile from '@/profile/domain/profile.entity.js'
import { useRoute } from 'vue-router'

const profile = ref(new Profile({}))
const route = useRoute()

onMounted(() => {
  const userId = route.params.id

  const profilesService = new ProfilesService()
  profilesService.getByUserId(userId)
    .then((response) => {
      profile.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})

</script>
