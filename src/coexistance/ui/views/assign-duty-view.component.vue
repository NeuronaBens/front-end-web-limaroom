<template>
  <div class="container">
    <div class="assign__roommate">
      <h1>{{ route.query.title }}</h1>

      <div class="divider"></div>
      <div class="roommates__available__wrapper">
        <h3>Roommates availables</h3>
        <div class="roommates__available__list">
          <AssignRoommateComponent
            v-for="roommate in roommates"
            v-bind:key="roommate.id"
            :roommate="roommate"
            @toggleRoommate="onToggleRoommate"
          />
        </div>
      </div>

      <Button
        text="Confirm"
        :loader="confirming"
        @click="confirmAssignment"
      />

    </div>
  </div>
</template>

<style lang="scss">
.assign__roommate {
  margin: 2rem 0;

  .divider {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .roommates__available__list {
    display: flex;
    flex-wrap: wrap;
    margin: 2rem 0;
    gap: 2rem;
  }
}
</style>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
// Services
import DutiesService from '@/coexistance/services/duties-api.service'
// Components
import AssignRoommateComponent from '@/coexistance/ui/components/assign-roommate.component.vue'
import Button from '@/shared/ui/components/button.component.vue'

/* eslint-disable-next-line */
const router = useRouter()
const route = useRoute()
const roommates = ref([])
const selectedRoommates = ref([])
const confirming = ref(false)

const onToggleRoommate = (id) => {
  const index = selectedRoommates.value.indexOf(id)
  index === -1 ? selectedRoommates.value.push(id) : selectedRoommates.value.splice(index, 1)
}

const confirmAssignment = () => {
  if (confirming.value) return

  confirming.value = true
  const dutiesService = new DutiesService()
  dutiesService.assignRoommates(route.params.dutyId, selectedRoommates.value)
    .then(() => {
      confirming.value = false
      router.push({ name: 'my-team-view', params: { id: route.params.id } })
    })
}

onMounted(() => {
  const dutiesService = new DutiesService()
  dutiesService.getRoommatesAvailablesForDuty(route.params.dutyId)
    .then((response) => {
      roommates.value = response
    })
})
</script>
