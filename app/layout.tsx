import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  Noto_Sans,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
  Noto_Sans_Gurmukhi,
  Noto_Sans_Kannada,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
} from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-noto-sans' })
const notoDevanagari = Noto_Sans_Devanagari({ weight: ['500', '700'], variable: '--font-noto-devanagari', preload: false })
const notoKannada = Noto_Sans_Kannada({ weight: ['500', '700'], variable: '--font-noto-kannada', preload: false })
const notoTelugu = Noto_Sans_Telugu({ weight: ['500', '700'], variable: '--font-noto-telugu', preload: false })
const notoTamil = Noto_Sans_Tamil({ weight: ['500', '700'], variable: '--font-noto-tamil', preload: false })
const notoBengali = Noto_Sans_Bengali({ weight: ['500', '700'], variable: '--font-noto-bengali', preload: false })
const notoGurmukhi = Noto_Sans_Gurmukhi({ weight: ['500', '700'], variable: '--font-noto-gurmukhi', preload: false })

export const metadata: Metadata = {
  title: 'Gram Panchayat Agriculture AI Kiosk Terminal',
  description:
    'Universal-access agriculture kiosk for Gram Panchayats and Raiyata Seva Kendras: diagnose stalled subsidies and get proactive scheme advice in any Indian language.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0F5132',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${notoDevanagari.variable} ${notoKannada.variable} ${notoTelugu.variable} ${notoTamil.variable} ${notoBengali.variable} ${notoGurmukhi.variable}`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
