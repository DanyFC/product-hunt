"use client"
import { FirebaseAuthContext } from "@/firebase/FirebaseAuthContext"
import { FirestoreContext } from "@/firebase/FirestoreContext"
import { formatDistanceToNow } from "date-fns"
import { useContext, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Button from "@/components/Button"
import Image from "next/image"
import Loader from "@/components/Loader"

const ProductDetail = ({ params }) => {
  const router = useRouter()

  const { product, getProduct, loadingStore, voteProduct, addComment, deleteProduct } = useContext(FirestoreContext)
  const { user } = useContext(FirebaseAuthContext)
  const [errorStore, setErrorStore] = useState(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    getProduct(params.productId)
      .then(() => {
        setErrorStore(null)
      })
      .catch(error => setErrorStore({ product: error.message }))
  }, [])

  const createComment = async (event) => {
    event.preventDefault()
    if (!user || comment.trim() === '') {
      setErrorStore({ comment: 'Not logged or write a valid comment!' })
      return
    }
    setErrorStore(null)
    try {
      await addComment({
        content: comment,
        created: Date.now()
      })
      setComment('')
    } catch (error) {
      setErrorStore({ comment: error.message })
    }
  }

  const deleteHandler = async () => {
    try {
      await deleteProduct()
      router.push("/")
    } catch (error) {
      setErrorStore({ product: error.message })
    }
  }

  return (
    <div>
      {
        errorStore?.product
          ? <p className="text-center text-4xl mt-20 font-bold text-orange">{errorStore.product}</p>
          : null
      }
      {user && user.uid === product?.user.id
        ? <button className='block mt-4 mx-auto font-bold uppercase border-solid border border-[#d1d1d1] py-3 px-8 last-of-type:mr-0 bg-white text-[#000] hover:cursor-pointer text-center' onClick={deleteHandler} >&#x2717; Delete Product</button>
        : null
      }
      {
        product
          ? (
            <div className="container">
              <h1 className="text-center mt-10 text-4xl">{product.name}</h1>

              <div className="sm:grid sm:grid-cols-[2fr_1fr] gap-x-8">
                <div>
                  <p>Published ago: {formatDistanceToNow(new Date(product.created))} </p>
                  <p>For: <span className="uppercase font-bold">{product.user.name}</span> of <span className="uppercase font-bold">{product.company}</span> company.</p>

                  <Image src={product.imageURL} alt={product.name} width={0} height={0} className="w-full" />
                  <p>{product.description}</p>

                  {user
                    ? <>
                      <h2 className="text-4xl my-7">Add your comment</h2>
                      <form onSubmit={createComment}>
                        <div className="flex items-center mb-8">
                          <input className="flex-1 p-4 border-solid border border-gray3" type="text" name="name" id="name" placeholder="New comment" value={comment} onChange={event => setComment(event.target.value)} />
                        </div>
                        <button type="submit" className={` ${loadingStore ? 'bg-gray2' : 'bg-orange'} w-[100%] text-white py-6 font-bold text-3xl uppercase border-none font-pt-sans hover:cursor-pointer mt-4`} disabled={loadingStore}>Send</button>
                      </form>
                      {
                        errorStore?.comment
                          ? <p className="text-center text-2xl font-bold text-orange">{errorStore.comment}</p>
                          : null
                      }
                    </>
                    : null
                  }
                  <h2 className="text-4xl my-7">Comments</h2>
                  <ul>
                    {product.comments.length === 0
                      ? <p>No comments yet</p>
                      : product.comments.map((comment, index) => (
                        <li key={index} className="border border-solid border-gray3 mb-5 px-6 py-6">
                          <p className="m-0">{comment.content}</p>
                          <p className="m-0 text-xl font-bold">-Write by: {comment.user.userName} {comment.user.id === product.user.id ? <span className="font-bold text-white bg-orange p-1 px-2">Creator</span> : null}</p>
                        </li>
                      ))}
                  </ul>
                </div>
                <aside>
                  <Button bgColor value="Visit URL" href={product.url} className='w-full' />
                  <div className="mt-20">
                    <p className="text-center">Votes: {product.votes.length}</p>
                    {user
                      ? <button className='block my-8 mx-auto font-bold uppercase border-solid border border-[#d1d1d1] py-3 px-8 mr-4 last-of-type:mr-0 bg-white text-[#000] hover:cursor-pointer text-center w-full' onClick={voteProduct} >Vote</button>
                      : null
                    }
                  </div>
                </aside>
              </div>
            </div>
          )
          : <Loader />
      }
    </div>
  )
}

export default ProductDetail