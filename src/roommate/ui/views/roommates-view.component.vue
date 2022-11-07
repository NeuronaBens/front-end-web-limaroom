<template>
  <h1>Look for your roommate</h1>
  <div class="roommates">
    <ProfileComponent v-for="roommate in roommates" v-bind:key="roommate.id" :profile="roommate"/>
  </div>
</template>

<style lang="scss">
</style>

<script setup>
import { ref, onMounted } from 'vue'
import RoommatesService from '@/roommate/services/roommate-api.service'
import ProfileComponent from '@/roommate/ui/components/profile-component.vue'
import { userStore } from '@/shared/config/store'
const roommates = ref([])
const currentUser = userStore()

const getRoommates = () => {
  const currentProfileId = currentUser.state.user.profileId
  const roommatesService = new RoommatesService()
  roommatesService.getAllRoommatesWithoutTeam()
    .then((response) => {
      roommates.value = response.data.resource.filter((roommate) => {
        return roommate.id !== currentProfileId
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getRoommates()
})

</script>
