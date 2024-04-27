"use client"
import { FirebaseAuthContext } from "@/firebase/FirebaseAuthContext"
import { useContext } from "react"
import Button from "./Button"
import Link from "next/link"
import Search from "./Search"

const Header = () => {

  const { user, logOut } = useContext(FirebaseAuthContext)

  return (
    <div className="border-b-2 border-solid border-gray3 py-4">
      <div className="max-w-screen-lg mx-auto md:flex md:justify-between">
        <div className="flex items-center">
          <Link href='/'>
            <p className="text-orange text-7xl leading-[0] font-bold font-roboto-slab mr-8 my-14 ">P</p>
          </Link>
          <Search />
          <nav className="text-3 font-pt-sans flex gap-8 text-gray2">
            <Link href='/'>Home</Link>
            <Link href='/popular'>Popular</Link>
            {user && <Link href='/new-product'>New product</Link>}
          </nav>
        </div>

        <div className="flex items-center">
          {
            user
              ? (<>
                <p className="mr-8">Hi, <span className="font-bold">{user.displayName}</span></p>
                <button type="button" className="font-bold uppercase border-solid border border-[#d1d1d1] py-3 px-8 mr-4 last-of-type:mr-0 bg-[#da552f] text-white" onClick={logOut}>Logout</button>
              </>)
              : (<>
                <Button bgColor value="Login" href="/login" />
                <Button value="Create account" href="/register" />
              </>)
          }
        </div>
      </div>
    </div>
  )
}

export default Header