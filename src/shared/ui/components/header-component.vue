<template>
  <header class="header">
    <img class="logo" src="@/shared/ui/assets/images/logo.png" alt="logo">
    <i class="pi pi-bars icon" @click="toggleNav"></i>
    <div class="nav" ref="nav">
      <nav>
        <LinkGroup :routes="studentRoutes" :fn="toggleNav" v-if="isStudent"/>
        <LinkGroup :routes="lessorRoutes" :fn="toggleNav" v-else/>
        <div class="divider"></div>
        <div class="nav-user-options">
          <LinkGroup :routes="accountRoutes" :fn="toggleNav"/>
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
import LinkGroup from '@/shared/ui/components/link-group-component.vue'

const router = useRouter()
const isNavVisible = ref(false)
const nav = ref(null)
const currentUser = userStore()

const id = currentUser.state.user.id

const accountRoutes = [
  { name: 'Profile', to: 'show-profile-view' },
  { name: 'Sign Out', to: '', callback: () => signOut() }
]

const studentRoutes = [
  { name: 'Offers', to: 'offers-view' },
  { name: 'Roommates', to: 'roommates-view' },
  { name: 'Requests', to: 'requests-view', params: { id } }
]

const lessorRoutes = [
  { name: 'My Properties', to: 'my-offers-view', params: { id } },
  { name: 'Requests', to: 'requests-view', params: { id } }
]

const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value
  nav.value.style.marginTop = isNavVisible.value ? '0' : '-150%'
}

const signOut = () => {
  currentUser.signOut()
    .then((result) => {
      router.push({ name: 'sign-in-view' })
    })
}

const isStudent = computed(() => {
  return currentUser.state.user.role === 'ROLE_USER_STUDENT'
})

</script>
