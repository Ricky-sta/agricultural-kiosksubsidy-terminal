import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-noto-sans' })
// Indic script fonts load via a stylesheet because next/font/google fails to resolve them in Turbopack production builds.
const INDIC_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@500;700&family=Noto+Sans+Devanagari:wght@500;700&family=Noto+Sans+Gurmukhi:wght@500;700&family=Noto+Sans+Kannada:wght@500;700&family=Noto+Sans+Tamil:wght@500;700&family=Noto+Sans+Telugu:wght@500;700&display=swap'

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
      className={notoSans.variable}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={INDIC_FONTS_URL} />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
