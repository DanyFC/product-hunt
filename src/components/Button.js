import Link from "next/link"

const Button = ({ bgColor, value = 'empty', href = '/' }) => {
  return (
    <Link className={`block my-8 mx-auto font-bold uppercase border-solid border border-[#d1d1d1] py-3 px-8 mr-4 last-of-type:mr-0 ${bgColor ? 'bg-[#da552f]' : 'bg-white'} ${bgColor ? 'text-white' : 'text-[#000]'} hover:cursor-pointer text-center`} href={href}>{value}</Link>
  )
}

export default Button