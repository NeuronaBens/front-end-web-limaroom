<template>
  <div class="container">
    <div class="profile">
      <div class="profile__title">
        <h1>This is my profile</h1>
      </div>
      <div class="profile__image">
        <img :src="profile.photoUrl" alt="">
      </div>
      <div class="profile__information">
        <p><span class="fw-bold">Name: </span> {{ profile.name }}</p>
        <p><span class="fw-bold">Last Name: </span> {{ profile.surname }}</p>
        <p><span class="fw-bold">Gender: </span> {{ profile.gender }}</p>
        <p><span class="fw-bold">Age: </span> {{ profile.age }}</p>
        <p><span class="fw-bold">About me: </span> {{ profile.about }}</p>
        <p><span class="fw-bold">Location: </span> {{ profile.country + ' - ' + profile.city }}</p>
        <p v-if="isStudent"><span class="fw-bold">Status: </span> {{ teamStatus[profile.teamStatus] }}</p>
        <p><span class="fw-bold">Phone: </span>{{ profile.phone.code }} {{ profile.phone.number }}</p>
      </div>

      <div v-if="isStudent">
        <div v-if="haveAttributes">
          <div class="divider"></div>
          <div class="profile__attributes">
            <h2>Personality Type</h2>
            <div class="profile__attributes__list">
              <div v-for="attribute in attributes.filter(attr => attr.type === 'personality')" :key="attribute.id"
                class="profile__attributes__list__item">
                <p>{{ attribute.name }}</p>
                <p>{{ attribute.value }}</p>
              </div>
            </div>
            <h2>Interests</h2>
            <div class="profile__attributes__list">
              <div v-for="attribute in attributes.filter(attr => attr.type === 'interest')" :key="attribute.id"
                class="profile__attributes__list__item">
                <p>{{ attribute.name }}</p>
                <p>{{ attribute.value }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="divider"></div>
          <p>Tell us more about you! It will help us to find the best roommate for you</p>
          <router-link :to="{ name: 'assign-attributes-view' }" class="button-primary">Take survey</router-link>
        </div>

        <div v-if="!self">
          <div class="divider"></div>
          <RequestComponent :request="request" />
        </div>
        <div v-else>
          <div class="divider"></div>
          <div class="change__role">
            <h2>Do you want to be a lessor?</h2>
            <button @click="handleChangingRole = !handleChangingRole" class="button-primary">Change to Lessor</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" v-if="handleChangingRole">
    <div class="modal__content">
      <h1>Are you sure you want to change to lessor?</h1>
      <p>You can not go back to student</p>
      <div class="modal__actions">
        <button @click="handleChangingRole = !handleChangingRole" class="button-black">Cancel</button>
        <button @click="changeRole" class="button-primary">Change to Lessor</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.profile {
  text-align: center;
  margin: 2rem 0;

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

  .change__role {
    margin-bottom: 2rem;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  .modal__content {
    background-color: $white;
    padding: 2rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      text-align: center;
    }

    .modal__actions {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;

      button {
        margin-right: 1rem;
      }
    }
  }
}
</style>

<script setup>
import { onMounted, ref, computed } from 'vue'
import ProfilesService from '@/profile/services/profiles-api.service.js'
import AttributesService from '@/profile/services/attributes-api.service.js'
import Profile from '@/profile/domain/profile.entity.js'
import Request from '@/roommate/domain/request.entity.js'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import RequestComponent from '@/roommate/ui/components/request-form-component.vue'
import { userStore } from '@/shared/config/store'

const profile = ref(new Profile({}))
const attributes = ref([])
const request = ref(new Request({}))
const route = useRoute()
const currentUser = userStore()
const router = useRouter()
const handleChangingRole = ref(false)

const teamStatus = {
  WITHOUTTEAM: 'Looking for a roommate',
  ONTEAM: "I'm already in a team"
}

const self = computed(() => {
  return route.params.id ? route.params.id === '' : true
})

const isStudent = computed(() => {
  return currentUser.state.user.role === 'ROLE_USER_STUDENT'
})

const haveAttributes = computed(() => {
  return attributes.value.length > 0
})

const changeRole = () => {
  currentUser.changeRole(currentUser.state.user.id)
    .then(() => {
      handleChangingRole.value = false
      router.push({ name: 'my-offers-view', params: { id: currentUser.state.user.id } })
    })
}

onMounted(() => {
  const attributesService = new AttributesService()
  const profilesService = new ProfilesService()
  if (!self.value) {
    request.value.requestorId = currentUser.state.user.id
    request.value.requestedId = route.params.id

    profilesService.getById(route.params.id)
      .then((response) => {
        profile.value = response
        attributesService.getAllByProfileId(response.id)
          .then((response) => {
            attributes.value = response
          })
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    const userId = currentUser.state.user.id
    profilesService.getByUserId(userId).then((response) => {
      profile.value = response
      attributesService.getAllByProfileId(response.id)
        .then((response) => {
          attributes.value = response
        })
    })
  }
})

onBeforeRouteUpdate((to, from) => {
  if (to.params.id !== from.params.id) {
    const userId = currentUser.state.user.id
    const profilesService = new ProfilesService()
    profilesService.getByUserId(userId).then((response) => {
      profile.value = response
    })
  }
})

</script>
