<template>
  <div class="container">
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
          <InputText class="input" type="text" v-model="profile.about" required="true"/>
          <label>About</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.gender" required="true"/>
          <label>Gender</label>
        </div>
        <ImageInput ref="imageInputRef" :uploadService="currentUser.createProfile" />
      </fieldset>
      <fieldset>
        <legend>Extra Information</legend>
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.phone.number" required="true" />
          <label>Phone</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.location" required="true" />
          <label>Location</label>
        </div>
      </fieldset>

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
import ImageInput from '@/shared/ui/components/image-input-component.vue'

const profile = ref(new Profile({}))
const currentUser = userStore()
const router = useRouter()
const imageInputRef = ref(null)

const onSubmit = (e) => {
  e.preventDefault()
  profile.value.phone.code = '+51'

  if (!imageInputRef.value.imageBlob.files[0]) {
    console.log('No image')
    return
  }
  console.log(profile.value)
  const userId = currentUser.state.user.id
  // TODO: Validations

  // Create profile
  imageInputRef.value.uploadImage({ profile: profile.value, userId })
  // .then(() => {
  //   router.go()
  // })
}

onMounted(() => {
  const hasProfile = currentUser.state.user.hasProfile

  if (hasProfile) {
    const profileId = currentUser.state.user.profileId
    router.push({ name: 'show-profile-view', params: { id: profileId } })
  }
})
</script>
