<template>
  <div class="team__request">
    <p class="request__status" :style="{ color: statusColors[request.status] }">{{ request.status }}</p>
    <div>
      <p class="request__name">{{ request.studentRequestor.name }} {{ request.studentRequestor.surname }}</p>

      <div class="roommate__statuses">
        <h3 class="fw-bold">Roommate status</h3>
        <div class="roommate__statuses__list">
          <div class="roommate__status" v-for="roommateStatus in props.request.roommateStatuses"
            v-bind:key="roommateStatus.id">
            <p>{{ roommateStatus.roommate.profile.name }}</p>
            <p :style="{ color: statusColors[roommateStatus.status] }">{{ roommateStatus.status }}</p>
          </div>
        </div>
      </div>

      <div v-if="!allStudentsAccept" class="request__actions">
        <Button text="Decline" :loader="declining" @click="declineRequest" color="secondary"/>
        <Button text="Accept" :loader="accepting" @click="acceptRequest"/>
      </div>
    </div>
  </div>
  <Toast></Toast>
</template>

<style lang="scss">
.team__request {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;

  .request__status {
    font-weight: $bold;
  }

  .request__name {
    text-align: center;
  }

  .request__actions {
    display: flex;
    gap: 1rem;
  }

  .roommate__statuses {
    h3 {
      font-size: 1.6rem;
      text-align: center;
    }

    .roommate__status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;
    }
  }
}
</style>

<script setup>
import { userStore } from '@/shared/infraestructure/store'
import { useToast } from 'primevue/usetoast'
import { ref, computed } from 'vue'
// Services
import TeamRequestsService from '@/coexistance/services/team-requests-api.service'
// Components
import Button from '@/shared/ui/components/button.component.vue'

const currentUser = userStore()
const toast = useToast()
const statusColors = {
  PENDING: '#c2a200',
  ACCEPTED: 'green',
  DECLINED: 'red'
}

const props = defineProps({
  request: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update'])

const accepting = ref(false)
const declining = ref(false)

const allStudentsAccept = computed(() => {
  return props.request.roommateStatuses.every(roommateStatus => roommateStatus.status === 'ACCEPTED')
})

const acceptRequest = () => {
  if (declining.value) return

  accepting.value = true

  const teamRequestsService = new TeamRequestsService()
  teamRequestsService.accept(currentUser.state.user.id, props.request.id)
    .then((response) => {
      toast.add({ severity: 'success', summary: 'Request accepted correctly', life: 2000 })
      accepting.value = false
      emit('update', response)
    })
    .catch((error) => {
      console.log(error)
      toast.add({ severity: 'error', summary: 'Error while accepting', detail: error.message, life: 2000 })
    })
}

const declineRequest = () => {
  if (accepting.value) return

  declining.value = true

  const teamRequestsService = new TeamRequestsService()
  teamRequestsService.decline(currentUser.state.user.id, props.request.id)
    .then((response) => {
      toast.add({ severity: 'success', summary: 'Request declined correctly', life: 2000 })
      declining.value = false
      emit('update', response)
    })
    .catch((error) => {
      console.log(error)
      toast.add({ severity: 'error', summary: 'Error while declining', detail: error.message, life: 2000 })
    })
}

</script>
