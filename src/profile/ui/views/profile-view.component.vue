<template>
  <h1>This is my profile</h1>
  <p>{{profile.name}}</p>
  <p>{{profile.surname}}</p>
  <p>{{profile.phone.code}} {{profile.phone.number}}</p>

  <div v-if="!self">
    <RequestComponent  :request="request"/>
  </div>

  <div v-else>
    <RoommateRequestComponent />
  </div>
</template>

<style lang="scss">
</style>

<script setup>
import { onMounted, ref, computed } from 'vue'
import ProfilesService from '@/profile/services/profiles-api.service.js'
import Profile from '@/profile/domain/profile.entity.js'
import Request from '@/roommate/domain/request.entity.js'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import RequestComponent from '@/roommate/ui/components/request-form-component.vue'
import RoommateRequestComponent from '@/roommate/ui/components/roommate-requests-component.vue'
import { userStore } from '@/shared/config/store'

const profile = ref(new Profile({}))
const route = useRoute()
const request = ref(new Request({}))
const currentUser = userStore()

const self = computed(() => {
  return route.params.id ? route.params.id === '' : true
})

onMounted(() => {
  const profilesService = new ProfilesService()
  if (!self.value) {
    request.value.requestorId = currentUser.state.user.id
    request.value.requestedId = route.params.id

    // profilesService.getById(route.params.id)
    //   .then((response) => {
    //     profile.value = response.data.resource
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  } else {
    const userId = currentUser.state.user.id

    profilesService.getByUserId(userId).then((response) => {
      profile.value = response.data.resource
    })
  }
})

onBeforeRouteUpdate((to, from) => {
  if (to.params.id !== from.params.id) {
    const userId = currentUser.state.user.id
    const profilesService = new ProfilesService()
    profilesService.getByUserId(userId).then((response) => {
      profile.value = response.data.resource
    })
  }
})

</script>
