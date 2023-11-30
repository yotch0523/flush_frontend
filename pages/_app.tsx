import { InteractionType, PublicClientApplication } from '@azure/msal-browser'
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '~/globalStyles'
import Header from '~/modules/_common/components/Header'
import Sidebar from '~/modules/_common/components/Sidebar'
import { loginRequest, msalConfig } from '~/modules/_common/services/auth/config'
import { theme } from '~/modules/_common/themes'
import AppContextProvider from '~/providers/app'
import AuthProvider from '~/providers/auth'

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
              <Sidebar backgroundColor={theme.backgroundColor.main} color={theme.color.white} />
              <Header />
              <Component {...pageProps} />
            </MsalAuthenticationTemplate>
          </AppContextProvider>
        </AuthProvider>
      </MsalProvider>
    </ThemeProvider>
  )
}

export default MyApp
