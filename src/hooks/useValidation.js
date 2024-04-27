import { useEffect, useState } from "react"

const useValidation = (initialState, validation, fn) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    if (submit) {
      const noErrors = Object.keys(errors).length === 0
      if (noErrors) {
        fn()
      }
      setSubmit(false)
    }
  }, [submit])

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrors(validation(values))
    setSubmit(true)
  }

  const handleBlur = () => {
    setErrors(validation(values))
  }

  return {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit
  }
}

export default useValidation