<template>
  <div class="sign-up-form">
    <p>Register to</p>
    <h1>Meet Your Roommate</h1>
    <SignUpForm />
    <p class="sign-in-action">Have an account? <a href="#" @click="goToSignIn">Sign In</a>
    </p>
  </div>
</template>

<style lang="scss">
.sign-up-form {
  p:not(.sign-in-action) {
    font-size: 2rem;
  }

  .sign-in-action {
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
import SignUpForm from '../components/sign-up-form.component.vue'

const router = useRouter()

const goToSignIn = () => {
  router.push({ name: 'sign-in-view' })
}
</script>
