<template>
  <div class="roommates container">
    <h1>Look for your roommate</h1>
    <div class="divider"></div>
    <div class="roommates__list">
      <ProfileComponent v-for="roommate in roommates" v-bind:key="roommate.id" :profile="roommate"/>
    </div>
  </div>

</template>

<style lang="scss">
.roommates {
  padding: 2rem 0;

  h1 {
    text-transform: uppercase;
  }

  .divider {
    margin: 0;
    background-color: rgba($color: #000000, $alpha: 0.2);
  }

  .roommates__list {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import RoommatesService from '@/roommate/services/roommate-api.service'
import ProfileComponent from '@/roommate/ui/components/profile-component.vue'
import { userStore } from '@/shared/config/store'
const roommates = ref([])
const currentUser = userStore()

const getRoommates = () => {
  const id = currentUser.state.user.id
  const roommatesService = new RoommatesService()
  roommatesService.getAllRoommatesWithoutTeam(id)
    .then((response) => {
      roommates.value = response.data.resource
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getRoommates()
})

</script>
