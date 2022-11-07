<template>
  <div class="request">
    <p class="request__status" :style="{color: statusColors[status]}">{{ status }}</p>
    <div v-if="actions">
      <p class="request__name">{{ requestor.name }} {{ requestor.surname}}</p>

      <div class="request__actions">
        <button @click="acceptRequest" :disabled="!isPending" class="button-primary-block">Accept</button>
        <button @click="declineRequest" :disabled="!isPending" class="button-black-block">Decline</button>
      </div>
    </div>
    <div v-else>
      <p class="request__name">{{ requested.name }} {{ requested.surname }}</p>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";
.request {
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
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import RequestsService from '@/roommate/services/request-api.service.js'
const requestor = ref({})
const requested = ref({})
const status = ref('')

const statusColors = {
  PENDING: '#c2a200',
  ACCEPTED: 'green',
  DECLINED: 'red'
}

const isPending = ref(false)

const props = defineProps({
  request: {
    type: Object,
    required: true
  },
  actions: {
    type: Boolean,
    required: true
  }
})

const acceptRequest = () => {
  const requestsService = new RequestsService()
  requestsService.acceptRequest(props.request.id)
    .then((response) => {
      status.value = response.data.resource.status
    })
    .catch((error) => {
      console.log(error)
    })
  console.log('Accepting request...')
}

const declineRequest = () => {
  const requestsService = new RequestsService()
  requestsService.declineRequest(props.request.id)
    .then((response) => {
      status.value = response.data.resource.status
    })
    .catch((error) => {
      console.log(error)
    })
  console.log('Declining request...')
}

onMounted(() => {
  requestor.value = props.request.studentRequestor
  requested.value = props.request.studentRequested
  status.value = props.request.status

  isPending.value = status.value === 'PENDING'
})

</script>
