<template>
  <div class="container">
    <div class="team">
      <h1>My Team</h1>
      <div class="divider"></div>

      <p v-if="!haveTeam">Look for a roommate to enroll a team!</p>
      <div v-else>
        <h2>Team Members</h2>
        <div class="team__members">
          <RoommateComponent
            v-for="roommate in roommates"
            v-bind:key="roommate.id"
            :roommate="roommate"
            @goToProfile="goToProfile"
          />
        </div>
        <h2>Duties</h2>
        <div v-if="haveDuties" class="team__duties">
          <DutyComponent
            v-for="duty in duties"
            v-bind:key="duty.id"
            :duty="duty"
          />
        </div>
        <div v-else>
          <p>There's no duties</p>
          <p>Create a duty to organice your team</p>
        </div>
        <router-link :to="{name:'create-duty-view', params: { id:route.params.id, teamId: team.id }}" class="button-primary">Create duty</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/shared/ui/assets/scss/_buttons.scss';

.team {
  margin-top: 2rem;

  .team__members {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 2rem;
  }

  .team__duties {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;
  }
}
</style>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userStore } from '@/shared/config/store'
// Services
import TeamsService from '@/coexistance/services/teams-api.service'
// Components
import RoommateComponent from '@/coexistance/ui/components/roommate.component.vue'
import DutyComponent from '@/coexistance/ui/components/duty.component.vue'
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

onMounted(() => {
  const teamsService = new TeamsService()
  teamsService.getByUserId(route.params.id)
    .then((response) => {
      team.value = response
      roommates.value = response.roommates.map((roommate) => new Roommate(roommate))
      duties.value = response.duties.map((duty) => new Duty(duty))
      haveTeam.value = true
      console.log(duties.value)
    })
})
</script>
