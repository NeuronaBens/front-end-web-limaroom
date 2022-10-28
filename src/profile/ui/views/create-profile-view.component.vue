<template>
  <h1>Create your profile! </h1>
  <p>Let people know more about you</p>

  <form @submit="onSubmit">
    <div class="input-group">
      <InputText class="input" type="text" v-model="profile.name" required="true" />
      <label>Name</label>
    </div>
    <div class="input-group">
      <InputText class="input" type="text" v-model="profile.surname" required="true" />
      <label>Surname</label>
    </div>
    <div class="input-group">
      <InputText class="input" type="text" v-model="profile.phone.code" required="true" />
      <label>Code</label>
    </div>
    <div class="input-group">
      <InputText class="input" type="text" v-model="profile.phone.number" required="true" />
      <label>Phone</label>
    </div>
    <button type="submit">Create</button>
  </form>
</template>

<style lang="scss">
</style>

<script setup>
import { onMounted, ref } from 'vue'
import Profile from '@/profile/domain/profile.entity.js'
import { userStore } from '@/shared/config/store'
import { useRouter } from 'vue-router'

const profile = ref(new Profile({}))
const currentUser = userStore()
const router = useRouter()

const onSubmit = (e) => {
  e.preventDefault()
  console.log(profile.value)

  const userId = currentUser.state.user.id
  // TODO: Validations

  // Create profile
  currentUser.createProfile(profile)
    .then(() => {
      router.push({ name: 'show-profile-view', params: { id: userId } })
    })
  console.log('submit')
}

onMounted(() => {
  const hasProfile = currentUser.state.user.hasProfile
  console.log(hasProfile)
  if (hasProfile) {
    const userId = currentUser.state.user.id
    router.push({ name: 'show-profile-view', params: { id: userId } })
  }
  console.log('mounted')
})
</script>
