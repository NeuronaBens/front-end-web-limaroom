<template>
  <div class="container teams">
    <div class="teams__header">
      <h1>Look for a Team</h1>
      <Button text="look for roommate" :to="{ name: 'roommates-view' }" />
    </div>
    <div class="divider"></div>
    <LoadingComponent v-if="loading"></LoadingComponent>
    <div v-else class="div">
      <p v-if="inTeam">You are already in a team, go to "My Team" page</p>
      <div v-else class="teams__list">
        <TeamPreviewComponent v-for="team in teams" v-bind:key="team.id" :team="team" />
      </div>
    </div>

  </div>
</template>

<style lang="scss">
.teams {
  padding: 2rem 0;

  h1 {
    text-transform: uppercase;
  }

  .divider {
    width: 100%;
    margin: 1rem 0;
    background-color: rgba($color: #000000, $alpha: 0.2);
  }

  .teams__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button-primary {
      margin: 0;
    }
  }

  .teams__list {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '@/shared/infraestructure/store'
// Services
import TeamsService from '@/coexistance/services/teams-api.service'
// Components
import TeamPreviewComponent from '@/roommate/ui/components/team-preview.component.vue'
import Button from '@/shared/ui/components/button.component.vue'
import LoadingComponent from '@/shared/ui/components/loaders/list-loading.component.vue'

const teams = ref([])
const currentUser = userStore()
const inTeam = ref(false)
const loading = ref(true)

onMounted(() => {
  const teamsService = new TeamsService()
  teamsService.getByUserId(currentUser.state.user.id)
    .then(() => {
      inTeam.value = true
    })

  teamsService.getAll().then((response) => {
    teams.value = response
    console.log(teams.value)
    loading.value = false
  })
})
</script>
