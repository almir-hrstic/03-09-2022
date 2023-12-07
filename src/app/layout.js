import './styles/global.scss'
import { Oswald } from 'next/font/google'

const fonts = Oswald({ subsets: ['latin'] })

export async function generateMetadata() {

  return fetch(`${process.env.BASE_URL}/meta.json`).then(response => response.json())
}

export default function Layout({ children }) {

  return (

    <html lang="en">

      <body className={fonts.className}>
        {children}
      </body>

    </html>
  )
}
