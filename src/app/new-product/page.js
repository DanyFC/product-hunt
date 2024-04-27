"use client"
import { FirebaseAuthContext } from '@/firebase/FirebaseAuthContext'
import { FirestoreContext } from '@/firebase/FirestoreContext'
import { useRouter } from 'next/navigation'
import { useState, useContext, useEffect } from 'react'
import ErrorMessage from '@/components/ErrorMessage'
import newProductValidations from '@/validations/newProduct'
import useValidation from '@/hooks/useValidation'

const initialState = {
  name: '',
  company: '',
  url: '',
  description: ''
}

const NewProduct = () => {
  const router = useRouter()

  const { loadingStore, createProduct } = useContext(FirestoreContext)
  const { user } = useContext(FirebaseAuthContext)

  const { values, errors, handleBlur, handleChange, handleSubmit } = useValidation(initialState, newProductValidations, newProduct)
  const { name, company, url, description } = values

  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)

  async function newProduct() {
    const product = {
      name,
      company,
      url,
      description,
      votes: [],
      comments: [],
      created: Date.now()
    }
    if (!image) {
      setError('Load a image')
      return
    }
    try {
      await createProduct(product, image)
      router.push("/")
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  })

  return (
    <div>
      <h1 className="text-5xl text-center mt-16">Create new product</h1>
      <form className="max-w-[60rem] w-[95%] mx-auto mt-20 mb-1" onSubmit={handleSubmit}>
        <fieldset className='p-8 border border-gray3'>
          <legend className='px-4 text'>General information</legend>
          <div className="flex items-center mb-8">
            <label className="w-[120px] text-3xl">Name</label>
            <input className="flex-1 p-4 border-solid border border-gray3" type="text" name="name" id="name" placeholder="Product name" value={name} onChange={handleChange} onBlur={handleBlur} />
          </div>
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          <div className="flex items-center mb-8">
            <label className="w-[120px] text-3xl">Company</label>
            <input className="flex-1 p-4 border-solid border border-gray3" type="text" name="company" id="company" placeholder="Company name" value={company} onChange={handleChange} onBlur={handleBlur} />
          </div>
          {errors.company && <ErrorMessage>{errors.company}</ErrorMessage>}
          <div className="flex items-center mb-8">
            <label className="w-[120px] text-3xl">Image</label>
            <input className="flex-1 p-4 border-solid border border-gray3" type="file" name="image" id="image" onChange={(event) => setImage(event.target.files[0])} />
          </div>
          <div className="flex items-center mb-8">
            <label className="w-[120px] text-3xl">URL</label>
            <input className="flex-1 p-4 border-solid border border-gray3" type="text" name="url" id="url" placeholder="url" value={url} onChange={handleChange} onBlur={handleBlur} />
          </div>
          {errors.url && <ErrorMessage>{errors.url}</ErrorMessage>}
        </fieldset>

        <fieldset className='p-8 border border-gray3'>
          <legend className='px-4 text'>About your product</legend>
          <div className="flex items-center mb-8">
            <label className="w-[120px] text-3xl">Description</label>
            <textarea className="flex-1 p-4 border-solid border border-gray3 h-40" name="description" id="description" placeholder="Description" value={description} onChange={handleChange} onBlur={handleBlur} />
          </div>
          {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        </fieldset>
        <button type="submit" className={` ${loadingStore ? 'bg-gray2' : 'bg-orange'} w-[100%] text-white py-6 font-bold text-3xl uppercase border-none font-pt-sans hover:cursor-pointer mt-4`} disabled={loadingStore}>Continue</button>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </div >
  )
}

export default NewProduct