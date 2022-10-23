<template>
  <div class="sign-in-form">
    <p>Login to</p>
    <h1>Meet Your Roommate</h1>
    <SignInForm />
    <p class="sign-up-action">Don't have an account? <a href="#" @click="goToSignUp">Sign Up</a>
    </p>
  </div>
</template>

<style lang="scss">

.sign-in-form {
  p:not(.sign-up-action, .forgot-password) {
    font-size: 2rem;
  }

  .sign-up-action {
    margin-top: 2rem;
    color: $black;

    a {
      color: $primary;
    }
  }

  @include tablet {
    width: 90%;
    display: block;
    margin: auto;
  }
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import SignInForm from '../components/sign-in-form.component.vue'

const router = useRouter()

const goToSignUp = () => {
  router.push({ name: 'sign-up-view' })
}

</script>
