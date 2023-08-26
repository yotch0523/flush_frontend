import { InteractionType, PublicClientApplication } from '@azure/msal-browser'
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react'
import type { AppProps } from 'next/app'
import Header from '~/components/Header'
import AuthProvider from '~/providers/auth'
import { loginRequest, msalConfig } from '~/services/auth/config'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const instance = new PublicClientApplication(msalConfig)
  const authRequest = {
    ...loginRequest,
  }

  return (
    <MsalProvider instance={instance}>
      <AuthProvider>
        <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={authRequest}>
          <Header />
          <div>
            <Component {...pageProps} />
          </div>
        </MsalAuthenticationTemplate>
      </AuthProvider>
    </MsalProvider>
  )
}

export default MyApp
