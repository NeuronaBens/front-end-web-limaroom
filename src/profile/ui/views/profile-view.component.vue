<template>
  <div class="container">
    <div class="profile">
      <div class="profile__title">
        <h1>This is my profile</h1>
      </div>
      <div class="profile__image">
        <img src="@/roommate/ui/assets/avatar.png" alt="">
      </div>
      <div class="profile__information">
        <p><span class="fw-bold">Name: </span> {{ profile.name }}</p>
        <p><span class="fw-bold">Surname: </span> {{ profile.surname }}</p>
        <p><span class="fw-bold">Phone: </span>+{{ profile.phone.code }} {{ profile.phone.number }}</p>
      </div>

      <div class="divider"></div>
      <div v-if="isStudent">
        <div v-if="!self">
          <RequestComponent :request="request" />
        </div>

        <div v-else>
          <RoommateRequestComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.profile {
  text-align: center;

  .profile__image {
    width: 100%;
    overflow: hidden;

    img {
      border-radius: 1rem;
      max-height: 35rem;
      object-fit: cover;
    }
  }

  .profile__information {
    font-size: 2.2rem;
  }

  .divider {
    margin: 3rem auto;
    background-color: rgba($color: #000000, $alpha: 1.0);
  }
}
</style>

<script setup>
import { onMounted, ref, computed } from 'vue'
import ProfilesService from '@/profile/services/profiles-api.service.js'
import Profile from '@/profile/domain/profile.entity.js'
import Request from '@/roommate/domain/request.entity.js'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import RequestComponent from '@/roommate/ui/components/request-form-component.vue'
import RoommateRequestComponent from '@/roommate/ui/components/roommate-requests-component.vue'
import { userStore } from '@/shared/config/store'

const profile = ref(new Profile({}))
const route = useRoute()
const request = ref(new Request({}))
const currentUser = userStore()

const self = computed(() => {
  return route.params.id ? route.params.id === '' : true
})

const isStudent = computed(() => {
  return currentUser.state.user.role === 'ROLE_USER_STUDENT'
})

onMounted(() => {
  const profilesService = new ProfilesService()
  if (!self.value) {
    request.value.requestorId = currentUser.state.user.id
    request.value.requestedId = route.params.id

    profilesService.getById(route.params.id)
      .then((response) => {
        profile.value = response.data.resource
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    const userId = currentUser.state.user.id

    profilesService.getByUserId(userId).then((response) => {
      profile.value = response.data.resource
    })
  }
})

onBeforeRouteUpdate((to, from) => {
  if (to.params.id !== from.params.id) {
    const userId = currentUser.state.user.id
    const profilesService = new ProfilesService()
    profilesService.getByUserId(userId).then((response) => {
      profile.value = response.data.resource
    })
  }
})

</script>
