import { InteractionType, PublicClientApplication } from '@azure/msal-browser'
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react'
import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'
import { ui } from '~/consts/ui'
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

const GlobalStyle = createGlobalStyle`
  * {
    color: ${ui.font.baseColor};
  }

  body {
    margin: 0;
    padding: 0;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  ul {
    margin: 0;
    padding-left: 0;
  }

  li {
    list-style: none;
  }
`

export default MyApp
