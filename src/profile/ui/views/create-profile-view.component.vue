<template>
  <div class="container">
    <div class="form-header">
      <h1>Create your profile! </h1>
      <p>Let people know more about you</p>
    </div>

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
      <button type="submit" class="button-primary">Create</button>
    </form>
  </div>

</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";
@import "@/shared/ui/assets/scss/_inputs.scss";

.input-group {
  @include input-group;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.5rem;
  }
}
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
  currentUser.createProfile(profile.value)
    .then(() => {
      console.log('Profile created')
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
