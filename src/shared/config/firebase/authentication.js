import { app } from './index'

import {
  getAuth,
  createUserWithEmailAndPassword as signUp,
  signInWithEmailAndPassword as signIn,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

const auth = getAuth(app)

export const authentication = {
  auth,
  GoogleAuthProvider,
  signIn,
  signUp,
  signOut,
  signInWithPopup
}
