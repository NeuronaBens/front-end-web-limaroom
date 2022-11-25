<template>
  <div class="roommates container">
    <div class="roommates__header">
      <h1>Look for your roommate</h1>
      <Button :to="{ name: 'teams-view' }" text="Look for Team"></Button>
    </div>
    <div class="divider"></div>
    <LoadingComponent v-if="loading"></LoadingComponent>
    <div v-else  class="roommates__list">
      <ProfileComponent v-for="roommate in roommates" v-bind:key="roommate.id" :profile="roommate" />
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
    gap: 3rem;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '@/shared/infraestructure/store'
// Services
import RoommatesService from '@/roommate/services/roommate-api.service'
// Components
import ProfileComponent from '@/roommate/ui/components/profile.component.vue'
import Button from '@/shared/ui/components/button.component.vue'
import LoadingComponent from '@/shared/ui/components/loaders/list-loading.component.vue'

const roommates = ref([])
const currentUser = userStore()
const loading = ref(true)

onMounted(() => {
  const id = currentUser.state.user.id
  const roommatesService = new RoommatesService()
  roommatesService.getAllRoommatesWithoutTeam(id)
    .then((response) => {
      roommates.value = response
      loading.value = false
    })
})

</script>
