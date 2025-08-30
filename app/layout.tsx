// app/layout.tsx ou RootLayout
import './globals.css'
import { Exo_2 } from 'next/font/google'
import { Providers } from './providers'

export const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-exo2',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={exo2.className}>
      <body className="min-h-screen w-full overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
