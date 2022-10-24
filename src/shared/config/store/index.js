import { defineStore } from 'pinia'
import { ref } from 'vue'
import UsersService from '@/iam/services/users-api.service'

const user = JSON.parse(localStorage.getItem('user'))

export const userStore = defineStore('user', () => {
  const state = ref({
    status: {
      loggedIn: false
    },
    user: null
  })

  if (user) {
    state.value.status.loggedIn = true
    state.value.user = user
  }

  function signIn ({ email, password }) {
    const usersService = new UsersService()

    return usersService.signIn({ email, password })
      .then(user => {
        if (user) {
          state.value.status.loggedIn = true
          state.value.user = user
          return user
        }

        return null
      })
      .catch(error => {
        console.log(error)
      })
  }

  function signOut () {
    const usersService = new UsersService()
    usersService.signOut()
    state.value.status.loggedIn = false
    state.value.user = null
  }
  return { state, signIn, signOut }
})
