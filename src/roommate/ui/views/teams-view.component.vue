<template>
  <div class="container teams">
    <div class="teams__header">
      <h1>Look for a Team</h1>
      <router-link :to="{ name: 'roommates-view' }" class="button-primary">Look for Roommate</router-link>
    </div>
    <div class="divider"></div>
    <p v-if="inTeam">You are already in a team, go to "My Team" page</p>
    <div v-else class="teams__list">
      <TeamPreviewComponent v-for="team in teams" v-bind:key="team.id" :team="team"/>
    </div>

  </div>
</template>

<style lang="scss">
@import '@/shared/ui/assets/scss/_buttons.scss';
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
import { userStore } from '@/shared/config/store'
// Services
import TeamsService from '@/coexistance/services/teams-api.service'
// Components
import TeamPreviewComponent from '@/roommate/ui/components/team-preview-component.vue'

const teams = ref([])
const currentUser = userStore()
const inTeam = ref(false)

onMounted(() => {
  const teamsService = new TeamsService()
  teamsService.getByUserId(currentUser.state.user.id)
    .then(() => {
      inTeam.value = true
    })

  teamsService.getAll().then((response) => {
    teams.value = response
    console.log(teams.value)
  })
})
</script>
