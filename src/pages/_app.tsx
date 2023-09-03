import { InteractionType, PublicClientApplication } from '@azure/msal-browser'
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'
import GlobalStyle from '~/globalStyles'
import AppContextProvider from '~/providers/app'
import AuthProvider from '~/providers/auth'
import { loginRequest, msalConfig } from '~/services/auth/config'
import { theme } from '~/themes'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const instance = new PublicClientApplication(msalConfig)
  const authRequest = {
    ...loginRequest,
  }

  return (
    <ThemeProvider theme={theme}>
      <MsalProvider instance={instance}>
        <AuthProvider>
          <AppContextProvider>
            <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={authRequest}>
              <GlobalStyle />
              <Component {...pageProps} />
              <Sidebar backgroundColor={theme.backgroundColor.main} color={theme.color.white} />
              <Header />
            </MsalAuthenticationTemplate>
          </AppContextProvider>
        </AuthProvider>
      </MsalProvider>
    </ThemeProvider>
  )
}

export default MyApp
