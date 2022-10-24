<template>
  <div class="sign-in-view">
    <div class="picture">
    </div>
    <div class="auth-form">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
.sign-in-view {
  height: 100vh;
  color: $primary;

  display: grid;
  grid-template-rows: 45% 50%;

  @include tablet {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: inherit;
  }

  .picture {
    width: 100%;
    background-image: url('../assets/images/login.jpg');
    background-size: cover;
    background-position: center;
  }

  .auth-form {
    // background-color: $white;
    text-align: center;

    @include tablet {
      padding: 2rem 3rem;
    }
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    font-weight: $dark;
  }
}

.auth-form {

  @include tablet {
    width: 90%;
    display: block;
    margin: auto;
  }

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

}
</style>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push({ name: 'sign-in-view' })
})
</script>
