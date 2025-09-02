import './globals.css'
import { exo2 } from './fonts'
import { Providers } from './providers'
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={exo2.className}>
      <body className="min-h-screen w-full overflow-x-hidden">
        <Providers>{children}</Providers>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  )
}
