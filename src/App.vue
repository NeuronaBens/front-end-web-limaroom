<template>
  <Header v-if="isAuthenticated"></Header>
  <router-view></router-view>
</template>

<style scoped>

</style>

<script setup>
import Header from '@/shared/ui/components/header-component.vue'
import { userStore } from '@/shared/config/store/index.js'
import { computed } from 'vue'

const currentUser = userStore()

const isAuthenticated = computed(() => {
  return currentUser.state.status.loggedIn
})

</script>
