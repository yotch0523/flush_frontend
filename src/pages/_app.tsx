import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import type { AppProps } from 'next/app'
import Header from '~/components/Header'
import { msalConfig } from '~/services/auth/config'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const instance = new PublicClientApplication(msalConfig)
  console.info('env :', process.env.NEXT_PUBLIC_SUSI_AUTHORITY)
  return (
    <MsalProvider instance={instance}>
      <Header />
      <div>
        <Component {...pageProps} />
      </div>
    </MsalProvider>
  )
}

export default MyApp