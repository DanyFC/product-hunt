"use client"
import { FirestoreContext } from "@/firebase/FirestoreContext"
import { useContext, useEffect } from "react"
import Loader from "@/components/Loader"
import Product from "@/components/Product"

const Popular = () => {
  const { products, getProducts } = useContext(FirestoreContext)

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="product-list">
      <div className="container">
        <ul className="bg-white">
          {products.length === 0
            ? <Loader />
            : (
              products.sort((a,b)=> b.votes.length - a.votes.length).map(product => (
                <Product key={product.id} {...product} />
              ))
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Popular