<template>
  <header class="header">
    <img class="logo" src="@/shared/ui/assets/images/logo.png" alt="logo">
    <i class="pi pi-bars icon" @click="toggleNav"></i>
    <div class="nav" ref="nav">
      <!-- STUDENT NAV -->
      <nav v-if="isStudent">
        <a href="#" @click="goToOffers">Offers</a>
        <router-link to="">Roommates</router-link>
        <div class="divider"></div>
        <div class="nav-user-options">
          <a href="#" @click="goToMyProfile">Profile</a>
          <a href="#" @click="goToMyRequest">Requests</a>
          <a href="#" @click="signOut">Sign Out</a>
        </div>
        <i class="pi pi-times icon" @click="toggleNav"></i>
      </nav>
      <!-- LESSOR NAV -->
      <nav v-else>
        <a href="#" @click="goToMyProperties">My Properties</a>
        <div class="divider"></div>
        <div class="nav-user-options">
          <a href="#" @click="goToMyProfile">Profile</a>
          <a href="#" @click="signOut">Sign Out</a>
        </div>
        <i class="pi pi-times icon" @click="toggleNav"></i>
      </nav>
      <a href="#" class="user-options">
        <i class="pi pi-user icon"></i>
      </a>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  @include flex(row, space-between, center);
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .nav {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    background-color: $white;
    text-align: center;
    padding: .5rem 0;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    margin-top: -200%;
    transition: all ease 1s;
  }

  .icon {
    color: $primary;
    cursor: pointer;
  }
}

.nav {
  a {
    display: block;
    padding: 1rem 0;
    color: $black;

    &:hover {
      background-color: $primary;
      color: $white;
    }
  }

  .user-options {
    display: none;
  }

  .icon {
    margin-top: 1rem;
  }

  .divider {
    background-color: rgba(0, 0, 0, 0.192);
  }
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/shared/config/store/index.js'

const router = useRouter()
const isNavVisible = ref(false)
const nav = ref(null)
const currentUser = userStore()

const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value
  nav.value.style.marginTop = isNavVisible.value ? '0' : '-150%'
}

const goToMyRequest = () => {
  toggleNav()
  router.push({ name: 'requests-view', params: { id: currentUser.id } })
}

const goToMyProperties = () => {
  toggleNav()
  router.push({ name: 'properties-view', params: { id: currentUser.id } })
}

const goToOffers = () => {
  toggleNav()
  router.push({ name: 'offers-view' })
}
const signOut = () => {
  currentUser.signOut()
    .then((result) => {
      router.push({ name: 'sign-in-view' })
    })
}

const goToMyProfile = () => {
  toggleNav()
  router.push({ name: 'show-profile-view', params: { id: currentUser.state.user.id } })
}

const isStudent = computed(() => {
  return currentUser.state.user.role === 'ROLE_USER_STUDENT'
})

</script>
