import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {GoogleTagManager} from '@next/third-parties/google'

export default function App({Component, pageProps}: AppProps) {
  console.log('app file:', pageProps?.settings?.googleTagManager)
  return (
    <>
      <Component {...pageProps} />
      {pageProps?.settings?.googleTagManager && (
        <GoogleTagManager gtmId={pageProps.settings.googleTagManager} />
      )}
    </>
  )
}
