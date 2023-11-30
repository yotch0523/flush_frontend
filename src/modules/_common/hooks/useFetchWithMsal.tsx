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

const useFetchWithMsal = <T,>(method: HttpMethod = 'POST', endpoint: string) => {
  const { accounts, instance } = useMsal()
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState<any>(null)
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

  useEffect(() => {
    if ((result && !result.account) || msalError instanceof InteractionRequiredAuthError) {
      void instance.acquireTokenRedirect(tokenRequest)
    }
  }, [result, msalError])

  const msalFetch = useCallback(async (body?: FormData | null) => {
    try {
      await instance.initialize()
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
      if (!response.ok) throw new Error(response.statusText)
      const result: T = await response.json()

      setData(result)
      setIsLoading(false)
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        await instance.acquireTokenRedirect(tokenRequest)
      } else {
        setData(null)
        setFetchError(error)
      }
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    fetchError,
    data,
    msalFetch,
  }
}

export default useFetchWithMsal
