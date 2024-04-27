"use client"
import { FirebaseAuthContext } from "@/firebase/FirebaseAuthContext"
import { redirect } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import ErrorMessage from "@/components/ErrorMessage"
import loginValidation from "@/validations/login"
import useValidation from "@/hooks/useValidation"


const initialState = {
  email: '',
  password: ''
}

const Login = () => {
  const { user, logIn } = useContext(FirebaseAuthContext)
  const { values, errors, handleBlur, handleChange, handleSubmit } = useValidation(initialState, loginValidation, CheckIn)
  const { email, password } = values

  const [error, setError] = useState(null)

  async function CheckIn() {
    try {
      await logIn(email, password)
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      redirect('/')
    }
  }, [user])

  return (
    <div>
      <h1 className="text-5xl text-center mt-16">Login</h1>
      <form className="max-w-2xl w-[95%] mx-auto mt-20 mb-0" onSubmit={handleSubmit}>
        <div className="flex items-center mb-8">
          <label className="w-[120px] text-3xl">Email</label>
          <input className="flex-1 p-4 border-solid border border-gray3" type="email" name="email" id="email" placeholder="Your e-mail" value={email} onChange={handleChange} onBlur={handleBlur} />
        </div>
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <div className="flex items-center mb-8">
          <label className="w-[120px] text-3xl">Password</label>
          <input className="flex-1 p-4 border-solid border border-gray3" type="password" name="password" id="password" placeholder="●●●●●●●●" value={password} onChange={handleChange} onBlur={handleBlur} />
        </div>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <button type="submit" className="bg-orange w-[100%] text-white py-6 font-bold text-3xl uppercase border-none font-pt-sans hover:cursor-pointer">Continue</button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </div>
  )
}

export default Login