import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import Head from 'next/head'
import { GoogleAnalytics } from 'nextjs-google-analytics'

import AgeVerificationModal from '@components/Modal/Age/AgeVerification'
import OnBoardingModal from '@components/Modal/OnBoarding/OnBoarding'
import { useStore } from '@store/store'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthProvider } from 'contexts/auth'
import { ModalProvider } from 'contexts/modal'

import '@styles/globals.css'
import '@styles/signup-carousel.css'
import 'react-toastify/dist/ReactToastify.css'
import 'cropperjs/dist/cropper.css'

const poppins = Poppins({
  weight: ['700', '500', '400'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  const [queryClient] = React.useState(() => new QueryClient())
  const { isAgeVerified, onBoarding } = useStore((state) => ({
    isAgeVerified: state.isAgeVerified,
    onBoarding: state.onBoarding,
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Harpoon</title>
          <link rel='icon' type='image/x-icon' href='/favicon.ico' />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </Head>
        <main className={`${poppins.variable}`}></main>
        <AuthProvider>
          <ModalProvider>
            <GoogleAnalytics trackPageViews />
            <Component {...pageProps} />
          </ModalProvider>
          <ToastContainer
            autoClose={1500}
            position={toast.POSITION.BOTTOM_CENTER}
          />
          {!isAgeVerified && <AgeVerificationModal />}
          {isAgeVerified && onBoarding && <OnBoardingModal />}
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
