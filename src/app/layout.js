import './styles/global.scss'
import { Oswald } from 'next/font/google'

const fonts = Oswald({ subsets: ['latin'] })

export const metadata = { title: 'Almir & Nerma Hrštić' }

export default function Layout({ children }) {

  return (

    <html lang="en">

      <body className={fonts.className}>
        {children}
      </body>

    </html>
  )
}
