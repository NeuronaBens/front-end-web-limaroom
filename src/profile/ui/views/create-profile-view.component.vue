<template>
  <div class="create-profile container">
    <div class="form-header">
      <h1>Create your profile! </h1>
      <p>Let people know more about you</p>
    </div>

    <form @submit="onSubmit">
      <fieldset>
        <legend>Personal Information</legend>
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.name" required="true" />
          <label>Name</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.surname" required="true" />
          <label>Last Name</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.about" required="true" />
          <label>About</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="date" v-model="birthdate" required />
          <label>Birthdate</label>
        </div>
        <div class="" style="margin-bottom: 2rem;">
          <label>Gender</label>
          <select v-model="profile.gender">
            <option value="0" disabled>--- Select Gender ---</option>
            <option v-for="gender in genders" v-bind:key="gender.key" :value="gender.value">
              {{ gender.value }}
            </option>
          </select>
        </div>
        <ImageInput ref="imageInputRef" :uploadService="currentUser.createProfile" />
      </fieldset>
      <fieldset>
        <legend>Extra Information</legend>
        <div class="" style="margin-bottom: 2rem;">
          <label>Code</label>
          <select v-model="profile.phone.code">
            <option value="0" disabled>--- Select Code ---</option>
            <option v-for="code in codes" v-bind:key="code.key" :value="code.value">
              {{ code.value }}
            </option>
          </select>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.phone.number" required="true" />
          <label>Phone</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.country" required="true" />
          <label>Country</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.city" required="true" />
          <label>City</label>
        </div>
      </fieldset>

      <Button text="Create" :loader="submiting" @click="onSubmit" />
    </form>
  </div>

</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_inputs.scss";

.create-profile {
  margin-bottom: 2rem;

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
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { userStore } from '@/shared/infraestructure/store'
import { useRouter } from 'vue-router'
// Components
import ImageInput from '@/shared/ui/components/image-input.component.vue'
import Button from '@/shared/ui/components/button.component.vue'
// Entities
import Profile from '@/profile/domain/profile.entity.js'
import Codes from '@/profile/domain/code.enum'
import Genders from '@/profile/domain/gender.enum'

const profile = ref(
  new Profile(
    {
      phone: { code: Codes.PERU },
      gender: '0'
    }
  ))

const submiting = ref(false)

const birthdate = ref(new Date().toISOString().split('T')[0])
const currentUser = userStore()
const router = useRouter()
const imageInputRef = ref(null)
const codes = Object.entries(Codes).map(([key, value]) => ({ key, value }))
const genders = Object.entries(Genders).map(([key, value]) => ({ key, value: value.toUpperCase() }))

const getAge = (dateString) => {
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

const onSubmit = (e) => {
  e.preventDefault()
  profile.value.phone.code = '+51'

  if (!imageInputRef.value.imageBlob.files[0]) {
    console.log('No image')
    return
  }
  const userId = currentUser.state.user.id
  profile.value.age = getAge(birthdate.value)

  // TODO: Validations
  if (profile.value.gender === '0') {
    return
  }

  submiting.value = true
  // Create profile
  imageInputRef.value.uploadImage({ profile: profile.value, userId })
    .then(() => {
      submiting.value = false
      router.go()
    })
}

onMounted(() => {
  const hasProfile = currentUser.state.user.hasProfile

  if (hasProfile) {
    router.push({ name: 'show-profile-view' })
  }
})
</script>
