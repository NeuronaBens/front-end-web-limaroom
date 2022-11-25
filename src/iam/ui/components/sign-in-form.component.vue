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
  <Button text="login" :loader="signingIn" :block="true" @click="signIn" />
  <Button text="sign in with google" :loader="signingInWithGoogle" :block="true" @click="signInWithGoogle" />
  <Button text="get the mobile app" href="https://portal.testapp.io/apps/install/45aNXpZ773BNG" :block="true" color="secondary"></Button>
</template>

<style lang="scss">
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

    &.error {
      font-weight: bold;
      color: $primary;
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
import { userStore } from '@/shared/infraestructure/store'
import { useRouter } from 'vue-router'
// Components
import Button from '@/shared/ui/components/button.component.vue'

const router = useRouter()
const store = userStore()
const user = ref({
  email: '',
  password: ''
})

const signingIn = ref(false)
const signingInWithGoogle = ref(false)

const errorMessage = ref('')

const errorCodes = {
  'auth/wrong-password': 'Wrong password',
  'auth/user-not-found': 'User not found',
  'auth/invalid-email': 'Invalid email',
  'auth/user-disabled': 'User disabled'
}

const signIn = () => {
  if (!user.value.email || !user.value.password) {
    errorMessage.value = 'Please fill all the fields'
    return
  }

  signingIn.value = true
  store.signIn(user.value)
    .then((response) => {
      signingIn.value = false
      if (response.role === 'ROLE_USER_LESSOR') {
        router.push({ name: 'my-offers-view', params: { id: response.id } })
      } else {
        router.push({ name: 'offers-view' })
      }
    })
    .catch((error) => {
      signingIn.value = false
      errorMessage.value = errorCodes[error.code]
    })
}

const signInWithGoogle = () => {
  signingInWithGoogle.value = true
  store.signInWithGoogle()
    .then((response) => {
      signingInWithGoogle.value = false
      if (response.role === 'ROLE_USER_LESSOR') {
        router.push({ name: 'my-offers-view', params: { id: response.id } })
      } else {
        router.push({ name: 'offers-view' })
      }
    })
    .catch((error) => {
      signingIn.value = false
      errorMessage.value = errorCodes[error.code]
    })
}
</script>
