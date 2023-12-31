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

const useFetchWithMsal = <T,>() => {
  const { accounts, instance } = useMsal()
  const [loading, setLoading] = useState(false)
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

  const msalFetch = useCallback(
    async (
      method: HttpMethod = 'POST',
      path: string,
      body: FormData | null,
      contentType: string = 'application/json',
    ) => {
      try {
        await instance.initialize()
        const accessTokenResponse = await instance.acquireTokenSilent(tokenRequest)
        if (!accessTokenResponse.accessToken || accessTokenResponse.accessToken === '')
          throw new InteractionRequiredAuthError()

        const headers = new Headers()
        const bearer = `Bearer ${accessTokenResponse.accessToken}`

        headers.append('Authorization', bearer)
        headers.append('x-user-id', account?.idTokenClaims?.sub ?? '')
        if (contentType) headers.append('Content-Type', contentType)

        const options = {
          method,
          headers,
          body: body ? (contentType === 'application/json' ? JSON.stringify(body) : body) : null,
        }

        setLoading(true)
        const endpoint = path.startsWith('/api') ? path : process.env.NEXT_PUBLIC_API_ENDPOINT + path
        const response = await fetch(endpoint, options)
        if (!response.ok) throw new Error(response.statusText)
        const result: T = await response.json()

        setData(result)
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          await instance.acquireTokenRedirect(tokenRequest)
        } else {
          setData(null)
          setFetchError(error)
        }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return {
    loading,
    fetchError,
    data,
    msalFetch,
  }
}

export default useFetchWithMsal
