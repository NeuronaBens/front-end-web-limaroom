<template>
  <Header v-if="isAuthenticated"></Header>
  <router-view></router-view>
</template>

<style scoped>

</style>

<script setup>
import Header from '@/shared/ui/components/header.component.vue'
import { userStore } from '@/shared/infraestructure/store/index.js'
import { computed, onMounted } from 'vue'

const currentUser = userStore()

const isAuthenticated = computed(() => {
  return currentUser.state.status.loggedIn
})

const sessionExpires = () => {
  const user = localStorage.getItem('user')
  if (user) {
    const now = new Date()
    if (now.getTime() > currentUser.state.user.expiration) {
      localStorage.removeItem('user')
    }
  }
}

onMounted(() => {
  sessionExpires()
})

</script>
