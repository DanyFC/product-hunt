"use client"
import { redirect } from "next/navigation"
import { useEffect } from "react"

const ProductDetail = () => {

  useEffect(() => {
    redirect('/')
  }, [])

  return (
    <div></div>
  )
}

export default ProductDetail