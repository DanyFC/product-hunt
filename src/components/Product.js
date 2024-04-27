import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import Image from "next/image"
import Link from "next/link"

const Product = ({
  comments,
  created,
  description,
  id,
  imageURL,
  name,
  votes
}) => {
  return (
    <li className="flex justify-between items-center p-16 border border-solid border-gray3">
      <div className="flex-[0_1_900px] grid grid-cols-[1fr_3fr] gap-x-8">
        <div>
          <Image src={imageURL} alt={name} width={500} height={500} loading={"lazy"} />
        </div>
        <div>
          <Link href={`/products/${id}`} className="text-[2rem] font-bold m-0 hover:cursor-pointer">{name}</Link>
          <p className="text-xl m-0 text-[#888]">{description}</p>
          <div className="flex mt-8 items-center">
            <div className="flex items-center border border-solid border-gray3 py-[.3rem] px-4 mr-8">
              <Image src='/comment.png' alt='comment.png' width={0} height={0} className="w-8 mr-8 " />
              <p className="text-2xl mr-4 font-bold last-of-type:m-0">{comments.length} Comments</p>
            </div>
          </div>
          <p>Published ago: {formatDistanceToNow(new Date(created))} </p>
        </div>
      </div>

      <div className="flex_[0_0_auto] text-center border border-solid border-gray3 py-4 px-12">
        <div className="text-4xl" >&#9650;</div>
        <p className="m-0 text-4xl font-bold">{votes.length}</p>
      </div>
    </li>
  )
}

export default Product