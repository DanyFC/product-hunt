import './globals.css'
import { FirebaseAuthProvider } from '@/firebase/FirebaseAuthContext'
import { FirestoreProvider } from '@/firebase/FirestoreContext'
import { PT_Sans, Roboto_Slab } from 'next/font/google'
import Head from 'next/head'
import Header from './../components/Header'

const pt_sans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const roboto_slab = Roboto_Slab({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Product hunt',
  description: 'Product hunt app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <body className={`${pt_sans.className} ${roboto_slab.className}`}>
        <FirebaseAuthProvider>
          <FirestoreProvider>
            <main className='mb-12'>
              <Header />
              {children}
            </main>
          </FirestoreProvider>
        </FirebaseAuthProvider>
      </body>
    </html>
  )
}
