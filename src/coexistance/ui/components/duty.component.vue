<template>
  <div class="duty" @click="handleDetail = !handleDetail">
    <div class="duty__header">
      <p class="fw-bold">{{ duty.title }}</p>
      <p>{{ duty.status }}</p>
    </div>
    <div class="divider"></div>
    <p>Roommates assigned: {{ duty.roommateList.length }}</p>
  </div>

  <div class="modal duty__modal" v-if="handleDetail">
    <div class="modal__content">
      <h1>{{ duty.title }}</h1>
      <p>{{ duty.status }}</p>
      <p>{{ duty.description }}</p>
      <p>Due to: {{ datelineFormat }}</p>
      <div class="divider"></div>
      <div class="duty__roommates">
        <h3>Roommates assigned</h3>
        <div class="duty__roommates__list">
          <p v-if="!haveRoommateAssigned">There's no roommate assigned to this duty</p>
          <div v-for="roommate in duty.roommateList" v-bind:key="roommate.id">
            <div class="duty__roommates__item">
              <p><span class="fw-bold">Name:</span> {{ roommate.profile.name }} {{ roommate.profile.surname }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__actions">
        <Button @click="handleDetail = !handleDetail" text="Close" color="secondary" />
        <Button v-if="!haveRoommateAssigned" @click="goToAssignRoommate" text="Assign Roommate"/>
        <Button v-else-if="isMyDuty" @click="finishDuty" text="Finish" :loader="finishing"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.duty__modal {
  .modal__content {
    min-width: 40rem;
  }

  .divider {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .duty__roommates__item {
    text-align: center;
  }
}

.duty {
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
  text-align: center;
  cursor: pointer;

  .divider {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userStore } from '@/shared/infraestructure/store'
// Services
import DutiesService from '@/coexistance/services/duties-api.service'
// Components
import Button from '@/shared/ui/components/button.component.vue'

const emit = defineEmits(['finish'])
const currentUser = userStore()
const props = defineProps({
  duty: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const route = useRoute()
const handleDetail = ref(false)
const finishing = ref(false)

const haveRoommateAssigned = computed(() => {
  return props.duty.roommateList.length > 0
})

const finishDuty = () => {
  finishing.value = true
  const dutiesService = new DutiesService()
  dutiesService.finish(props.duty.id)
    .then((response) => {
      emit('finish', response)
    })
    .finally(() => {
      finishing.value = false
    })
}

const getRoommatesProfiles = () => {
  return props.duty.roommateList.map((roommate) => {
    return roommate.profile.id
  })
}

const isMyDuty = computed(() => {
  return getRoommatesProfiles().includes(currentUser.state.user.profileId)
})

const datelineFormat = computed(() => {
  return new Date(props.duty.dateline).toISOString().split('T')[0]
})

const goToAssignRoommate = () => {
  router.push({ name: 'assign-duty-to-roommate-view', params: { id: route.params.id, dutyId: props.duty.id }, query: { title: props.duty.title } })
}

</script>
