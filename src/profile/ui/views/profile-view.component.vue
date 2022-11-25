<template>
  <LoadingComponent v-if="loading"></LoadingComponent>
  <div v-else class="container">
    <div class="profile__title">
      <h1 v-if="self">My profile</h1>
      <h1 v-else>Hello I'm {{ profile.name }}</h1>
    </div>
    <div class="profile__card">
      <div class="profile__section profile__front" ref="profileView">
        <ProfileComponent
          :profile="profile"
          :canSendRequest="canSendRequest"
          :self="self"
          :isStudent="isStudent"
          @switch="showEditView"/>
      </div>
      <div class="profile__section profile__back" ref="editView">
        <EditProfileForm
          @switch="closeEditView"
          @edit="refreshProfile"
          ref="editViewRef"
        />
      </div>
    </div>
    <ProfileAttributes
      :roommateHaveAttributes="roommateHaveAttributes"
      :haveAttributes="haveAttributes"
      :attributes="attributes"
      :self="self"
    />
  </div>

</template>

<style lang="scss">
.profile__title h1 {
  text-transform: uppercase;
  text-align: center;
  margin-top: 2rem;
}

.profile__card {
  position: relative;
  margin: 2rem 10rem;
  border-radius: 1rem;
  height: 42rem;
  margin-bottom: 7rem;

  & .profile__front.rotate {
    transform: perspective(80rem) rotateY(180deg);
  }

  & .profile__back.rotate {
    transform: perspective(80rem) rotateY(360deg);
  }
}

.profile__section {
  position: absolute;
  padding: 4rem 1rem;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 2rem 0;
  backface-visibility: hidden;
  overflow: hidden;
  transition: .5s;
  box-shadow: 1px 1px 20px -6px rgba(0, 0, 0, 0.52);
  border-radius: 1rem;

  &.profile__front {
    transform: perspective(80rem) rotateY(0deg);
  }

  &.profile__back {
    transform: perspective(80rem) rotateY(180deg);
  }
}

</style>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { userStore } from '@/shared/infraestructure/store'
// Services
import ProfilesService from '@/profile/services/profiles-api.service.js'
import AttributesService from '@/profile/services/attributes-api.service.js'
// Components
import ProfileComponent from '@/profile/ui/components/show-profile.component.vue'
import LoadingComponent from '@/shared/ui/components/loaders/profile-loading.component.vue'
import EditProfileForm from '@/profile/ui/components/edit-profile-form.component.vue'
import ProfileAttributes from '@/profile/ui/components/profile-attributes.component.vue'
// Entities
import Profile from '@/profile/domain/profile.entity.js'

const profile = ref(new Profile({}))

const attributes = ref([])
const route = useRoute()
const currentUser = userStore()
const loading = ref(true)

const profileView = ref(null)
const editView = ref(null)

const editViewRef = ref(null)

const self = computed(() => {
  return route.params.id ? route.params.id === '' : true
})

const isStudent = computed(() => {
  return currentUser.state.user.role === 'ROLE_USER_STUDENT'
})

const currentUserOnTeam = computed(() => {
  return currentUser.state.user.teamStatus === 'ONTEAM'
})

const canSendRequest = computed(() => {
  return isStudent.value && !currentUserOnTeam.value && !self.value
})

const haveAttributes = computed(() => {
  return attributes.value.length > 0
})

const roommateHaveAttributes = computed(() => {
  return !haveAttributes.value && !self.value
})

const isSelf = ref(self.value)

const showEditView = () => {
  profileView.value.classList.add('rotate')
  editView.value.classList.add('rotate')
  editViewRef.value.setProfile(profile.value)
}

const closeEditView = () => {
  profileView.value.classList.remove('rotate')
  editView.value.classList.remove('rotate')
}

const refreshProfile = (profile) => {
  closeEditView()
  profile.value = profile
}

const getProfile = () => {
  const attributesService = new AttributesService()
  const profilesService = new ProfilesService()
  const id = isSelf.value ? currentUser.state.user.id : route.params.id
  const getProfileById = isSelf.value ? profilesService.getByUserId : profilesService.getById

  getProfileById(id)
    .then((response) => {
      profile.value = response
      attributesService.getAllByProfileId(response.id)
        .then((response) => {
          attributes.value = response
          loading.value = false
        })
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getProfile()
})

onBeforeRouteUpdate((to, from) => {
  loading.value = true
  if (to.name === from.name) {
    if (to.params.id === undefined || to.params.id === '') {
      isSelf.value = true
    }

    if (from.params.id === undefined || from.params.id === '') {
      isSelf.value = false
      route.params.id = to.params.id
    }
    getProfile()
  }
})

</script>
