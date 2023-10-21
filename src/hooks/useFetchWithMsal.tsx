import { InteractionRequiredAuthError, InteractionType, SilentRequest } from '@azure/msal-browser'
import { useMsal, useMsalAuthentication } from '@azure/msal-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type ApiConfig = {
  b2cScopes: string[]
}
const config: ApiConfig = {
  b2cScopes: process.env.NEXT_PUBLIC_API_SCOPE ? [process.env.NEXT_PUBLIC_API_SCOPE] : [],
}

const useFetchWithMsal = <T,>(method: HttpMethod, endpoint: string, body: FormData | null) => {
  const { accounts, instance } = useMsal()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<T | null>(null)

  const account = accounts.length > 0 ? accounts[0] : undefined
  const tokenRequest: SilentRequest = useMemo(() => {
    return {
      scopes: config.b2cScopes,
      account,
    }
  }, [account])

  const { result, error: msalError } = useMsalAuthentication(InteractionType.Redirect, {
    scopes: config.b2cScopes,
    account: account ? account : undefined,
    redirectUri: process.env.NEXT_PUBLIC_AUTHORITY,
  })
  console.info('result :', result)
  console.info('msalError :', msalError)

  const execute = useCallback(async () => {
    try {
      const accessTokenResponse = await instance.acquireTokenSilent(tokenRequest)
      if (!accessTokenResponse.accessToken || accessTokenResponse.accessToken === '')
        throw new InteractionRequiredAuthError()

      const headers = new Headers()
      const bearer = `Bearer ${accessTokenResponse.accessToken}`
      headers.append('Authorization', bearer)
      headers.append('x-user-id', account?.idTokenClaims?.sub ?? '')

      const options = {
        method,
        headers,
        body,
      }

      setIsLoading(true)
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + endpoint, options)
      const result = await response.json()
      setData(result)
      setIsLoading(false)
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        await instance.acquireTokenRedirect(tokenRequest)
      } else {
        setError(error)
      }
    }
  }, [body])

  useEffect(() => {
    void (async () => {})()
  }, [body])

  return {
    isLoading,
    error,
    data,
    execute,
  }
}

export default useFetchWithMsal
