"use client"
import Loader from "@/components/Loader"
import Product from "@/components/Product"
import { FirestoreContext } from "@/firebase/FirestoreContext"
import { useSearchParams } from "next/navigation"
import { useContext, useEffect } from "react"

const Search = () => {
  const searchParams = useSearchParams()
  const paramProduct = searchParams.get('product')
  const { products, getProducts } = useContext(FirestoreContext)

  useEffect(() => {
    getProducts()
  }, [paramProduct])

  return (
    <div className="product-list">
      <div className="container">
        <ul className="bg-white">
          {products.length === 0
            ? <Loader />
            : (
              products.filter(product => product.name.toLowerCase().includes(paramProduct.toLowerCase())).map(product => (
                <Product key={product.id} {...product} />
              ))
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Search