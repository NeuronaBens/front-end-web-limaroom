import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyD3daoodRrcriWgb6ML9ol-QxVHkBS9TnA",
  authDomain: "limaroom-a2a26.firebaseapp.com",
  projectId: "limaroom-a2a26",
  storageBucket: "limaroom-a2a26.appspot.com",
  messagingSenderId: "239713403758",
  appId: "1:239713403758:web:8bcd1195a026006207377f",
  measurementId: "G-TR1RQSZCX2"
};

/*
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? ''
}
*/

const app = initializeApp(firebaseConfig)

export { app }
