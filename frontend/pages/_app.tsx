import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {GoogleTagManager} from '@next/third-parties/google'
import {DM_Sans} from 'next/font/google'
import {Manrope} from 'next/font/google'
import {CartProvider} from '@/contexts/CartContext'
import PreviewProvider from '@/components/preview/PreviewProvider'

const DMSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

export default function App({Component, pageProps}: AppProps) {
  const {draftMode, token} = pageProps

  return (
    <>
      {draftMode ? (
        <PreviewProvider token={token}>
          <main className={`${DMSans.className} ${DMSans.variable}`}>
            <Component {...pageProps} />
          </main>
        </PreviewProvider>
      ) : (
        <CartProvider>
          <main className={`${DMSans.className} ${DMSans.variable}`}>
            <Component {...pageProps} />
            {pageProps?.settings?.googleTagManager && (
              <GoogleTagManager gtmId={pageProps.settings.googleTagManager} />
            )}
          </main>
        </CartProvider>
      )}
    </>
  )
}
