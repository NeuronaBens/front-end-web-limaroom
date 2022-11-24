<template>
  <div class="container team">
    <LoadingComponent v-if="loading"></LoadingComponent>
    <div v-else>
      <h1>Team {{ team.id }}</h1>
      <div class="divider"></div>
      <h2>Team Members</h2>
      <div class="team__members">
        <RoommateComponent v-for="roommate in roommates" v-bind:key="roommate.id" :roommate="roommate"
          @goToProfile="goToProfile" />
      </div>

      <TeamRequestFormComponent />
    </div>

  </div>
</template>

<style lang="scss">
.team {
  margin: 2rem auto;

  .team__members {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 2rem;
  }

  .divider {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 1rem 0;
  }
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
// Services
import TeamsService from '@/coexistance/services/teams-api.service'
// Components
import RoommateComponent from '@/coexistance/ui/components/roommate.component.vue'
import TeamRequestFormComponent from '@/roommate/ui/components/team-request-form.component.vue'
import LoadingComponent from '@/shared/ui/components/loaders/team-detail-loading.component.vue'
// Entities
import Team from '@/coexistance/domain/team.entity'
import Roommate from '@/coexistance/domain/roommate.entity'

const route = useRoute()
const team = ref(new Team())
const roommates = ref([])
const loading = ref(true)

onMounted(() => {
  const teamsService = new TeamsService()
  teamsService.getById(route.params.id).then((response) => {
    team.value = response
    roommates.value = response.roommates.map((roommate) => new Roommate(roommate))
    loading.value = false
  })
})
</script>
