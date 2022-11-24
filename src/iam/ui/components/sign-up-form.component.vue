<template>
  <form @submit="submitSignUp" class="form">
    <div class="input-group">
      <InputText class="input" type="text" v-model="email" required="true" />
      <label>Email</label>
    </div>
    <p class="error" v-for="error in emailErrors" v-bind:key="error">{{ error }}</p>
    <div class="input-group">
      <InputText class="input" type="password" v-model="password" required="true"/>
      <label>Password</label>
    </div>
    <p class="error" v-for="error in passwordErrors" v-bind:key="error">{{ error }}</p>
    <div class="input-group">
      <InputText class="input" type="password" v-model="confirmPassword" required="true" />
      <label>Password</label>
    </div>
    <p class="error" v-for="error in confirmPasswordErrors" v-bind:key="error">{{ error }}</p>

    <p class="error">{{ errorMessage }}</p>
    <Button
      text="Register"
      :loader="signingUp"
      :block="true"
      @click="submitSignUp"
    />
  </form>
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_inputs.scss";

.form {
  p.error {
    color: $primary;
    font-weight: bold;
    text-transform: lowercase;
  }
}
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
import { userStore } from '@/shared/infraestructure/store'
import { useRouter } from 'vue-router'

// Components
import Button from '@/shared/ui/components/button.component.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const emailErrors = ref('')
const passwordErrors = ref('')
const confirmPasswordErrors = ref('')

const store = userStore()
const signingUp = ref(false)

const errorCodes = {
  'auth/wrong-password': 'Wrong password',
  'auth/user-not-found': 'User not found',
  'auth/invalid-email': 'Invalid email',
  'auth/user-disabled': 'User disabled'
}

const errorMessage = ref('')

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
    return
  }

  if (passwordErrors.value.length > 0) {
    return
  }

  if (confirmPasswordErrors.value.length > 0) {
    return
  }

  signingUp.value = true

  store.signUp({ email: email.value, password: password.value })
    .then((user) => {
      signingUp.value = false
      if (user.role === 'ROLE_USER_STUDENT') {
        router.push({ name: 'offers-view' })
      } else {
        router.push({ name: 'my-offers-view', params: { id: user.id } })
      }
    })
    .catch((error) => {
      signingUp.value = false
      errorMessage.value = errorCodes[error.code]
    })
}

</script>
