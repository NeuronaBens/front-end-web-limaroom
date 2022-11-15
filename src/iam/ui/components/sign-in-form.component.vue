<template>
  <form class="form">
    <div class="input-group">
      <InputText class="input" type="text" v-model="user.email" required="true" />
      <label>Email</label>
    </div>
    <div class="input-group">
      <InputText class="input" type="password" v-model="user.password" required="true" />
      <label>Password</label>
    </div>
    <p class="error">{{ errorMessage }}</p>
    <p class="forgot-password">Forgot password? <a href="#">Click Here</a></p>
  </form>
  <button @click="signIn" class="button-primary-block">Login</button>
  <button @click="signInWithGoogle" class="button-primary-block">Sign In With Google</button>
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";
@import "@/shared/ui/assets/scss/_inputs.scss";

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    color: $black;
    a {
      color: $primary;
      cursor: pointer;
    }
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
import { userStore } from '@/shared/config/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = userStore()
const user = ref({
  email: '',
  password: ''
})

const errorMessage = ref('')

const errorCodes = {
  'auth/wrong-password': 'Wrong password',
  'auth/user-not-found': 'User not found',
  'auth/invalid-email': 'Invalid email',
  'auth/user-disabled': 'User disabled'
}

const signIn = () => {
  store.signIn(user.value)
    .then((response) => {
       
      if (response.role === 'ROLE_USER_LESSOR') {
        router.push({ name: 'my-offers-view', params: { id: response.id } })
      } else {
        router.push({ name: 'offers-view' })
      }
    })
    .catch((error) => {
      errorMessage.value = errorCodes[error.code]
    })
}

const signInWithGoogle = () => {
  store.signInWithGoogle()
    .then((response) => {
      if (response.role === 'ROLE_USER_LESSOR') {
        router.push({ name: 'my-offers-view', params: { id: response.id } })
      } else {
        router.push({ name: 'offers-view' })
      }
    })
}
</script>
