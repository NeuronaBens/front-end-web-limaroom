import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword as signUp,
  signInWithEmailAndPassword as signIn,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? ''
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()

const authentication = {
  auth,
  GoogleAuthProvider,
  signIn,
  signUp,
  signOut,
  signInWithPopup
}

const storage = getStorage(app)

export { app, authentication, storage }