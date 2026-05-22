import type { Metadata, Viewport } from 'next'
import { Noto_Sans_Bengali, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Toaster } from 'sonner'

const bangla = Noto_Sans_Bengali({ subsets: ['bengali'] })
const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1B5E20',
}

export const metadata: Metadata = {
  title: 'Hormulse Education AI',
  description: 'Quality, affordable, and accessible AI tutoring for every student in Bangladesh',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon-180x180.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn" className="bg-cream text-foreground">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`
            :root {
              --font-bangla: ${bangla.style.fontFamily};
              --font-sans: ${inter.style.fontFamily};
            }
          `}
        </style>
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
