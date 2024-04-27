"use client"
import { createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { firebase_app } from '@/firebase/config'
import Loader from '@/components/Loader'

const auth = getAuth(firebase_app)

export const FirebaseAuthContext = createContext(null)

export const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, []);

  return (
    <FirebaseAuthContext.Provider
      value={{
        user,
        firebase_app,
        register: async (name, email, password) => {
          let result = null
          try {
            result = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, { displayName: name })
          } catch (error) {
            console.log('Error creating user: ', error.message)
            throw new Error("Registration failed,  please try again.")
          }
        },
        logOut: async () => {
          try {
            signOut(auth)
          } catch (error) {
            console.log('Error to log out', error.message)
            throw new Error("Logout failed, please try again.")
          }
        },
        logIn: async (email, password) => {
          let result = null
          try {
            result = await signInWithEmailAndPassword(auth, email, password)
          } catch (error) {
            console.log('Error logging in: ', error.message)
            throw new Error("Unable to login, please check your credentials.")
          }
        },
      }}
    >
      {loading ? <Loader /> : children}
    </FirebaseAuthContext.Provider>
  )
}