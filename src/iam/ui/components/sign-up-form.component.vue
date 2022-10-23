<template>
  <form class="form">
    <div class="input-group">
      <InputText class="input" type="text" v-model="email" required="true" />
      <label>Email</label>
    </div>
    <div class="input-group">
      <InputText class="input" type="password" v-model="password" required="true" />
      <label>Password</label>
    </div>
    <div class="input-group">
      <InputText class="input" type="password" v-model="confirmPassword" required="true" />
      <label>Password</label>
    </div>
    <button class="button-primary-block">Register</button>
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
  @include tablet {
    width: auto;
  }
}
</style>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

</script>
