const ErrorMessage = ({children}) => {
  return (
    <>
    <p className="bg-red-500 p-4 font-pt-sans font-bold text-2xl text-white text-center uppercase my-8 ">{children}</p>
    </>
  )
}

export default ErrorMessage