import { initializeApp } from 'firebase/app'

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  applyActionCode,
  updatePassword,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  connectAuthEmulator
} from 'firebase/auth'

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  deleteField,
  doc,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  connectFirestoreEmulator
} from 'firebase/firestore'

import { getFunctions, httpsCallable } from 'firebase/functions'

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage'

import { getAnalytics } from 'firebase/analytics'

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
})

const analytics = getAnalytics(firebaseApp)
const auth = getAuth(firebaseApp)
auth.languageCode = 'pt_br'
const db = getFirestore(firebaseApp)
const functions = getFunctions(firebaseApp, 'southamerica-east1')
const storage = getStorage(firebaseApp)

console.log(location.hostname)
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  console.log('localhost')
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', '8080')
}

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  applyActionCode,
  updatePassword,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  db,
  doc,
  query,
  where,
  collection,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  deleteField,
  onSnapshot,
  Timestamp,
  orderBy,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  onAuthStateChanged,
  functions,
  httpsCallable,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  analytics
}
