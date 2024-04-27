"use client"
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore'
import { createContext, useContext, useState } from 'react'
import { FirebaseAuthContext } from './FirebaseAuthContext'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuid } from 'uuid'

export const FirestoreContext = createContext()

export const FirestoreProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)
  const [loadingStore, setLoadingStore] = useState(false);
  const { firebase_app, user } = useContext(FirebaseAuthContext)

  const db = getFirestore(firebase_app)
  const storage = getStorage(firebase_app)

  return <FirestoreContext.Provider
    value={{
      loadingStore,
      products,
      product,
      createProduct: async (product, image) => {
        let storageRef = ref(storage, uuid())
        try {
          setLoadingStore(true)
          await uploadBytes(storageRef, image)
          product.imageURL = await getDownloadURL(storageRef)
          product.user = { id: user.uid, name: user.displayName }
          const savedProduct = await addDoc(collection(db, "products"), product)
          setLoadingStore(false)
          return savedProduct
        } catch (error) {
          setLoadingStore(false)
          console.log('Error to create product:', error.message)
          throw new Error('Could not add the product!')
        }
      },
      getProducts: async () => {
        setProduct(null)
        try {
          const querySnapshot = await getDocs(collection(db, "products"))
          const databaseProducts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          setProducts(databaseProducts)
        } catch (error) {
          console.log('Error to get products:', error.message)
          throw new Error('Could not fetch products!')
        }
      },
      getProduct: async (id) => {
        try {
          const docRef = doc(db, 'products', id)
          const docSnapShot = await getDoc(docRef)
          if (docSnapShot.data()) {
            setProduct({ ...docSnapShot.data(), id: docSnapShot.id })
          } else {
            setProduct(null)
            throw new Error(`No product with the id ${id}`)
          }
        } catch (error) {
          console.log('Error to get a product:', error.message)
          throw new Error(error.message)
        }
      },
      voteProduct: async () => {
        try {
          const docRef = doc(db, 'products', product.id)
          await updateDoc(docRef, { votes: arrayUnion(user.uid) })
          setProduct({ ...product, votes: [...product.votes, user.uid] })
        } catch (error) {
          console.log('Error to vote a product:', error.message)
          throw new Error('Vote failed!')
        }
      },
      addComment: async (comment) => {
        try {
          const docRef = doc(db, 'products', product.id)
          comment.user = { id: user.uid, userName: user.displayName }
          await updateDoc(docRef, { comments: arrayUnion(comment) })
          setProduct({ ...product, comments: [...product.comments, comment] })
        } catch (error) {

        }
      },
      deleteProduct: async () => {
        try {
          if (user.uid === product.user.id) {
            await deleteDoc(doc(db, 'products', product.id))
          } else {
            throw new Error("You don't have permission to perform this action.")
          }
        } catch (error) {
          console.log('Error to delete a product', error.message)
          throw new Error('Delete failed!')
        }
      },
    }}
  >
    {children}
  </FirestoreContext.Provider>
}