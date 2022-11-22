<template>
  <div class="roommates container">
    <div class="roommates__header">
      <h1>Look for your roommate</h1>
      <router-link :to="{ name: 'teams-view' }" class="button-primary">Look for Team</router-link>
    </div>
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
    width: 100%;
    margin: 1rem 0;
    background-color: rgba($color: #000000, $alpha: 0.2);
  }

  .roommates__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button-primary {
      margin: 0;
    }
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
import { userStore } from '@/shared/config/store'
// Services
import RoommatesService from '@/roommate/services/roommate-api.service'
// Components
import ProfileComponent from '@/roommate/ui/components/profile-component.vue'

const roommates = ref([])
const currentUser = userStore()

onMounted(() => {
  const id = currentUser.state.user.id
  const roommatesService = new RoommatesService()
  roommatesService.getAllRoommatesWithoutTeam(id)
    .then((response) => {
      roommates.value = response
    })
})

</script>
