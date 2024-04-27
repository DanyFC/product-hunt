const registerValidation = (values) => {
  let errors = {}

  if (!values.name) {
    errors.name = 'Name is required'
  }

  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format"
  }

  if (!values.password) {
    errors.password = 'Password field is required'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be 6 characters long'
  }

  return errors
}

export default registerValidation