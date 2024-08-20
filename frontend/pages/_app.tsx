import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {GoogleTagManager} from '@next/third-parties/google'
import {Cormorant_Infant} from 'next/font/google'
import {Manrope} from 'next/font/google'

const cormorantInfant = Cormorant_Infant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant-infant',
})

const Manropes = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
})

export default function App({Component, pageProps}: AppProps) {
  return (
    <main className={cormorantInfant.className}>
      <Component {...pageProps} />
      {pageProps?.settings?.googleTagManager && (
        <GoogleTagManager gtmId={pageProps.settings.googleTagManager} />
      )}
    </main>
  )
}
