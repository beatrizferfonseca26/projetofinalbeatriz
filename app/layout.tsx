import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Sallon',
  description: 'Beleza com hora marcada',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
