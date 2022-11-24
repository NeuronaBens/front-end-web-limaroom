<template>
  <div class="container">
    <div class="profile">
      <div class="profile__title">
        <h1 v-if="self">My profile</h1>
        <h1 v-else>Hello I'm {{ profile.name }}</h1>
      </div>
      <div class="profile__image">
        <img
          :src="profile.photoUrl ? profile.photoUrl : 'https://firebasestorage.googleapis.com/v0/b/meet-your-roommate-c7ed7.appspot.com/o/common%2Fuser.png?alt=media&token=f39a2c1d-8321-4b2d-87fc-d3b64c4b2618'"
          alt="">
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
          <div v-if="self">
            <div class="divider"></div>
            <p>Tell us more about you! It will help us to find the best roommate for you</p>
            <Button text="take survey" :to="{ name: 'assign-attributes-view' }" />
          </div>
        </div>

        <div v-if="!self">
          <div v-if="!haveTeam">
            <div class="divider"></div>
            <RequestComponent />
          </div>
        </div>
        <div v-else>
          <div class="divider"></div>
          <div class="change__role">
            <h2>Do you want to be a lessor?</h2>
            <Button text="change to lessor" @click="handleChangingRole = !handleChangingRole" />
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
        <Button text="cancel" color="secondary" @click="handleChangingRole = !handleChangingRole" />
        <Button text="confirm" :loader="changingRole" @click="changeRole" />
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
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { userStore } from '@/shared/infraestructure/store'
// Services
import ProfilesService from '@/profile/services/profiles-api.service.js'
import AttributesService from '@/profile/services/attributes-api.service.js'
// Components
import RequestComponent from '@/roommate/ui/components/request-form.component.vue'
import Button from '@/shared/ui/components/button.component.vue'
// Entities
import Profile from '@/profile/domain/profile.entity.js'

const profile = ref(new Profile({}))
const attributes = ref([])
const route = useRoute()
const currentUser = userStore()
const router = useRouter()
const handleChangingRole = ref(false)
const changingRole = ref(false)

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

const haveTeam = computed(() => {
  return currentUser.state.user.teamStatus === 'ONTEAM'
})
const haveAttributes = computed(() => {
  return attributes.value.length > 0
})

const changeRole = () => {
  changingRole.value = true
  currentUser.changeRole(currentUser.state.user.id)
    .then(() => {
      changingRole.value = false
      handleChangingRole.value = false
      router.push({ name: 'my-offers-view', params: { id: currentUser.state.user.id } })
    })
}

onMounted(() => {
  const attributesService = new AttributesService()
  const profilesService = new ProfilesService()
  const id = self.value ? currentUser.state.user.id : route.params.id
  const getProfile = self.value ? profilesService.getByUserId : profilesService.getById

  getProfile(id)
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
