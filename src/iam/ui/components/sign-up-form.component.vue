<template>
  <form @submit="submitSignUp" class="form">
    <div class="input-group">
      <InputText class="input" type="text" v-model="email" required="true" />
      <label>Email</label>
    </div>
    <p v-for="error in emailErrors" v-bind:key="error">{{ error }}</p>
    <div class="input-group">
      <InputText class="input" type="password" v-model="password" required="true"/>
      <label>Password</label>
    </div>
    <p v-for="error in passwordErrors" v-bind:key="error">{{ error }}</p>
    <div class="input-group">
      <InputText class="input" type="password" v-model="confirmPassword" required="true" />
      <label>Password</label>
    </div>
    <p v-for="error in confirmPasswordErrors" v-bind:key="error">{{ error }}</p>
    <button type="submit" class="button-primary-block">Register</button>
  </form>
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";
@import "@/shared/ui/assets/scss/_inputs.scss";

.input-group {
  width: 95%;
  @include input-group();
}

.button-primary-block {
  width: 100%;
}
</style>

<script setup>
import { ref } from 'vue'
import { userStore } from '@/shared/config/store'
import router from '../../../shared/config/router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const emailErrors = ref('')
const passwordErrors = ref('')
const confirmPasswordErrors = ref('')

const store = userStore()

const validations = {
  email: [
    () => !!email.value || 'Email is required',
    () => /.+@.+\..+/.test(email.value) || 'Email must be valid'
  ],
  password: [
    () => !!password.value || 'Password is required',
    () => password.value.length >= 6 || 'Password must be at least 6 characters'
  ],
  confirmPassword: [
    () => !!confirmPassword.value || 'Confirm Password is required',
    () => confirmPassword.value === password.value || 'Confirm Password must be same as Password'
  ]
}

const submitSignUp = (e) => {
  e.preventDefault()

  emailErrors.value = validations.email.map(v => v()).filter(v => v !== true)
  passwordErrors.value = validations.password.map(v => v()).filter(v => v !== true)
  confirmPasswordErrors.value = validations.confirmPassword.map(v => v()).filter(v => v !== true)

  if (emailErrors.value.length > 0) {
    console.log(...emailErrors)
    return
  }

  if (passwordErrors.value.length > 0) {
    console.log(...passwordErrors)
    return
  }

  if (confirmPasswordErrors.value.length > 0) {
    console.log(...confirmPasswordErrors)
    return
  }

  store.signUp({ email: email.value, password: password.value })
    .then(() => {
      router.push({ name: 'offers-view' })
      console.log('sign up success')
    })
}

</script>
