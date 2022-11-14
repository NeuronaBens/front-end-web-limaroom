import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authentication } from '@/shared/config/firebase'
import UsersService from '@/iam/services/users-api.service'
import ProfilesService from '@/profile/services/profiles-api.service'

const user = JSON.parse(localStorage.getItem('user'))

const { auth, GoogleAuthProvider, signInWithPopup } = authentication

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

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    return await signInWithPopup(auth, provider)
      .then(({ user }) => {
        const { uid, email } = user
        const usersService = new UsersService()

        return usersService.getById(uid)
          .then(response => {
            console.log('signing in')
            return usersService.signIn(uid)
              .then(user => {
                if (user) {
                  state.value.status.loggedIn = true
                  state.value.user = user
                  return user
                }
                return null
              })
          })
          .catch(() => {
            console.log('signing up')
            return usersService.signUp({ id: uid, address: email })
              .then(user => {
                console.log('user-signup: ', user)
                if (user) {
                  state.value.status.loggedIn = true
                  state.value.user = user
                  return user
                }
                return null
              })
          })
      })
  }

  const signUp = async ({ email, password }) => {
    return await authentication.signUp(auth, email, password)
      .then(({ user }) => {
        const usersService = new UsersService()
        return usersService.signUp({ id: user.uid, address: email })
          .then(user => {
            console.log('user-signup: ', user)
            if (user) {
              state.value.status.loggedIn = true
              state.value.user = user
              return user
            }
            return null
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const signIn = async ({ email, password }) => {
    return await authentication.signIn(auth, email, password)
      .then(({ user }) => {
        const { uid } = user
        const usersService = new UsersService()
        return usersService.signIn(uid)
          .then(user => {
            if (user) {
              state.value.status.loggedIn = true
              state.value.user = user
              return user
            }
            return null
          })
      })
  }

  const changeRole = (id) => {
    const usersService = new UsersService()
    return usersService.changeRole(id)
      .then(user => {
        if (user) {
          state.value.status.loggedIn = true
          state.value.user = user
          return user
        }
        return null
      })
  }

  const signOut = async () => {
    const usersService = new UsersService()
    await authentication.signOut(auth)
      .then(() => {
        usersService.signOut()
        state.value.status.loggedIn = false
        state.value.user = null
      })
      .catch(error => {
        console.log(error)
      })
  }

  const createProfile = (profile) => {
    const { id } = state.value.user
    const profilesService = new ProfilesService()
    console.log(profile)
    return profilesService.create(profile, id)
      .then((response) => {
        if (response) {
          state.value.user.hasProfile = true
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { state, signIn, signOut, signUp, signInWithGoogle, createProfile, changeRole }
})
