import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, signIn as firebaseSignIn, signUp as firebaseSignUp, signOut as firebaseSignOut } from '@/iam/config/firebase-config'
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

  const signUp = async ({ email, password, name }) => {
    return await firebaseSignUp(auth, email, password)
      .then(({ user }) => {
        const usersService = new UsersService()
        return usersService.signUp({ id: user.uid, address: email })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const signIn = async ({ email, password }) => {
    const response = await firebaseSignIn(auth, email, password)

    if (response) {
      console.log(response)
    }
    // .then(user => {
    //   if (user) {
    //     state.value.status.loggedIn = true
    //     state.value.user = user
    //     return user
    //   }

    //   return null
    // })
    // .catch(error => {
    //   console.log(error)
    // })
  }

  const signOut = async () => {
    try {
      const usersService = new UsersService()
      await firebaseSignOut(auth)
      usersService.signOut()
      state.value.status.loggedIn = false
      state.value.user = null
    } catch (error) {
      console.log(error)
    }
  }
  return { state, signIn, signOut, signUp }
})
