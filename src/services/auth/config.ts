import { Configuration } from '@azure/msal-browser'
import { apiConfig } from '~/services/api/config'
import { b2cPolicies } from '~/services/policies'

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_APP_CLIENTID ?? '',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain!] ?? [],
    redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
}

export const loginRequest = {
  scopes: ['openid', ...apiConfig.b2cScopes],
}

export const tokenRequest = {
  scopes: [...apiConfig.b2cScopes],
  forceRefresh: false,
}
