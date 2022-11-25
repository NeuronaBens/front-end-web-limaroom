<template>
  <div class="form">
    <div class="profile__preview">
      <div class="profile__image">
        <img :src="profile.photoUrl ? profile.photoUrl : defaultProfileImage" alt="">
      </div>
    </div>
    <form>
      <div class="input__collection">
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.name" required="true" />
          <label>Name</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.surname" required="true" />
          <label>Surname</label>
        </div>
      </div>
      <div class="input__collection">
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.country" required="true" />
          <label>Country</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.city" required="true" />
          <label>City</label>
        </div>
      </div>

      <div class="input__collection">
        <div class="input-group">
          <InputText class="input" type="text" v-model="profile.phone.number" required="true" />
          <label>Phone</label>
        </div>
      </div>
      <div class="input-group">
        <InputText class="input" type="text" v-model="profile.about" required="true" />
        <label>About</label>
      </div>
      <div class="form__actions">
        <Button text="cancel" color="secondary" @click="onCancel" />
        <Button text="confirm" :loader="loading" @click="onConfirmEdit" />
      </div>

    </form>
  </div>

</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_inputs.scss";

.form {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 2rem;
  padding: 0 4rem;

  form {
    .input-group {
      @include input-group;
      width: 100%;

      .input {
        margin-bottom: 2rem;
      }
    }

    .input__collection {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .form__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 2rem;
    }
  }

}
</style>

<script setup>
import { ref } from 'vue'
// Services
import ProfilesService from '@/profile/services/profiles-api.service.js'
// Components
import Button from '@/shared/ui/components/button.component.vue'
// Entities
import Profile from '@/profile/domain/profile.entity'

const defaultProfileImage = 'https://firebasestorage.googleapis.com/v0/b/meet-your-roommate-c7ed7.appspot.com/o/common%2Fuser.png?alt=media&token=f39a2c1d-8321-4b2d-87fc-d3b64c4b2618'
const profile = ref(new Profile({}))
const loading = ref(false)
const emit = defineEmits(['switch', 'edit'])

const onCancel = () => {
  emit('switch')
}

const setProfile = (profileToEdit) => {
  profile.value = profileToEdit
}

const onConfirmEdit = () => {
  loading.value = true
  const profilesService = new ProfilesService()
  profilesService.update(profile.value.id, profile.value)
    .then((response) => {
      emit('edit', response)
      loading.value = false
    })
}

defineExpose({
  setProfile
})
</script>
