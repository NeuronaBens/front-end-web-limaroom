<template>
  <div class="container">
    <div class="team">
      <h1>My Team</h1>
      <div class="divider"></div>
      <p v-if="!haveTeam">Look for a roommate to enroll a team!</p>
      <div v-else>
        <section class="section">
          <h2>Team Members</h2>
          <div class="team__members">
            <RoommateComponent v-for="roommate in roommates" v-bind:key="roommate.id" :roommate="roommate"
              @goToProfile="goToProfile" />
          </div>
        </section>

        <div class="section">
          <h2>Duties</h2>
          <div v-if="haveDuties" class="team__duties">
            <DutyComponent v-for="duty in duties" v-bind:key="duty.id" :duty="duty" />
          </div>
          <div v-else>
            <p>There's no duties</p>
            <p>Create a duty to organice your team</p>
          </div>
          <router-link :to="{ name: 'create-duty-view', params: { id: route.params.id, teamId: team.id } }"
            class="button-primary">Create duty</router-link>
        </div>

        <div class="divider"></div>
        <div class="section">
          <h2>Requests</h2>
          <div v-if="haveRequests" class="team__requests">
            <TeamRequestComponent v-for="request in teamRequests" v-bind:key="request.id" :request="request"
              @update="updateRequest" />
          </div>
          <div v-else>
            <p>There's no requests</p>
            <p>Ask for a roommate to join your team</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/shared/ui/assets/scss/_buttons.scss';

.team {
  margin: 2rem 0;

  .section {
    margin: 2rem 0;
  }
  .team__members {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    align-items: center;
    gap: 2rem;
  }

  .team__duties {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;
  }

  .team__requests {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
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
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userStore } from '@/shared/infraestructure/store'
// Services
import TeamsService from '@/coexistance/services/teams-api.service'
import TeamRequestsService from '@/coexistance/services/team-requests-api.service'
// Components
import RoommateComponent from '@/coexistance/ui/components/roommate.component.vue'
import DutyComponent from '@/coexistance/ui/components/duty.component.vue'
import TeamRequestComponent from '@/coexistance/ui/components/team-request.component.vue'
// Entities
import Team from '@/coexistance/domain/team.entity'
import Roommate from '@/coexistance/domain/roommate.entity'
import Duty from '@/coexistance/domain/duty.entity'

const route = useRoute()
const router = useRouter()
const currentUser = userStore()
const team = ref(new Team({}))
const roommates = ref([])
const duties = ref([])
const teamRequests = ref([])
const haveTeam = ref(false)

const goToProfile = (id) => {
  if (id === currentUser.state.user.profileId) {
    router.push({ name: 'show-profile-view' })
  } else {
    router.push({ name: 'show-profile-view', params: { id } })
  }
}

const haveDuties = computed(() => {
  return duties.value.length > 0
})

const haveRequests = computed(() => {
  return teamRequests.value.length > 0
})

const updateRequest = (request) => {
  teamRequests.value = teamRequests.value.map((r) => {
    if (r.id === request.id) {
      return request
    }
    return r
  })

  if (request.status === 'ACCEPTED') {
    getTeam()
  }
}

const getTeam = () => {
  const teamsService = new TeamsService()
  teamsService.getByUserId(route.params.id)
    .then((response) => {
      team.value = response
      roommates.value = response.roommates.map((roommate) => new Roommate(roommate))
      duties.value = response.duties.map((duty) => new Duty(duty))
    })
}

onMounted(() => {
  const teamsService = new TeamsService()
  teamsService.getByUserId(route.params.id)
    .then((response) => {
      team.value = response
      roommates.value = response.roommates.map((roommate) => new Roommate(roommate))
      duties.value = response.duties.map((duty) => new Duty(duty))
      haveTeam.value = true

      const teamRequestsService = new TeamRequestsService()
      teamRequestsService.getAllByTeamId(response.id)
        .then((response) => {
          teamRequests.value = response
        })
    })
})
</script>
