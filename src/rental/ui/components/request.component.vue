<template>
  <div class="request">
    <p>Status: <span :style="{ color: statusColors[request.status] }">{{ request.status }}</span></p>
    <p>Message: <span>{{ request.message }}</span></p>
    <p>Property: <span>{{ request.rentalOffering.property.title }}</span></p>
    <p>Property owner: <span>{{ request.rentalOffering.property.profile.name }} {{ request.rentalOffering.property.profile.surname }}</span></p>
    <p>User Name: <span>{{ request.studentProfile.name }} {{ request.studentProfile.surname }}</span></p>
    <div v-if="!isStudent" class="request__actions">
      <Button
        text="Accept"
        :loader="accepting"
        @click="acceptRequest"
      />
      <Button
        text="Decline"
        color="secondary"
        :loader="declining"
        @click="declineRequest"
      />

    </div>
  </div>

  <Toast></Toast>
</template>

<style lang="scss">
.request {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;

  p {
    font-weight: $bold;
    text-align: center;

    span {
      font-weight: $regular;
    }
  }

  .request__actions {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
  }
}
</style>

<script setup>
import { computed, ref } from 'vue'
import { userStore } from '@/shared/infraestructure/store'
import { useToast } from 'primevue/usetoast'
// Services
import RequestsService from '@/rental/services/requests-api.service'
// Component
import Button from '@/shared/ui/components/button.component.vue'

const currentUser = userStore()
const toast = useToast()

const statusColors = {
  PENDING: '#c2a200',
  ACCEPTED: 'green',
  DECLINED: 'red'
}

const accepting = ref(false)
const declining = ref(false)

const props = defineProps({
  request: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['refresh'])

const isStudent = computed(() => {
  return currentUser.state.user.role === 'ROLE_USER_STUDENT'
})

const acceptRequest = () => {
  if (declining.value) return
  accepting.value = true
  const requestsService = new RequestsService()
  requestsService.accept(props.request.id)
    .then((response) => {
      emit('refresh', response)
      toast.add({ severity: 'success', summary: 'Request accepted correctly', life: 3000 })
    })
    .catch(() => {
      toast.add({ severity: 'error', summary: 'Error accepting request', life: 3000 })
    })
    .finally(() => {
      accepting.value = false
    })
}

const declineRequest = () => {
  if (accepting.value) return
  declining.value = true
  const requestsService = new RequestsService()
  requestsService.decline(props.request.id)
    .then((response) => {
      emit('refresh', response)
      toast.add({ severity: 'success', summary: 'Request accepted correctly', life: 3000 })
    })
    .catch(() => {
      toast.add({ severity: 'error', summary: 'Error declining request', life: 3000 })
    })
    .finally(() => {
      declining.value = false
    })
}

</script>
