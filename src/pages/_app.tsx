import { InteractionType, PublicClientApplication } from '@azure/msal-browser'
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react'
import type { AppProps } from 'next/app'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'
import { ui } from '~/consts/ui'
import GlobalStyle from '~/globalStyles'
import AppContextProvider from '~/providers/app'
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
        <AppContextProvider>
          <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={authRequest}>
            <GlobalStyle />
            <Component {...pageProps} />
            <Sidebar backgroundColor={ui.backgroundColor.main} color={ui.color.white} />
            <Header />
          </MsalAuthenticationTemplate>
        </AppContextProvider>
      </AuthProvider>
    </MsalProvider>
  )
}

export default MyApp
