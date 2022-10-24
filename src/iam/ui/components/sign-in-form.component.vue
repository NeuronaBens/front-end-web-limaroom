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
    <p class="forgot-password">Forgot password? <a href="#">Click Here</a></p>
  </form>
  <button @click="signIn" class="button-primary-block">Login</button>
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
  @include tablet {
    width: auto;
  }
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { userStore } from '@/shared/config/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = userStore()
const user = ref({
  email: '',
  password: ''
})

const signIn = () => {
  currentUser.signIn(user.value)
    .then(() => {
      if (currentUser.state.user.role === 'ROLE_USER_STUDENT') {
        router.push({ name: 'offers-view' })
      } else {
        router.push({ name: 'properties-view' })
      }
    })
}

onMounted(() => {
  console.log(currentUser.state)
  if (currentUser.state.status.loggedIn) {
    router.push({ name: 'offers-view' })
  }
})
</script>
