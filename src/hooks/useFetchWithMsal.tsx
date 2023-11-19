import { InteractionRequiredAuthError, InteractionType, SilentRequest } from '@azure/msal-browser'
import { useMsal, useMsalAuthentication } from '@azure/msal-react'
import { useCallback, useMemo, useState } from 'react'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type Result<T> = {
  statusCode: number
  message: string
  data: T
}

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
  console.info('result :', result)
  console.info('msalError :', msalError)

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
      const result: Result<T> = await response.json()

      if (result.statusCode !== 200) {
        setData(null)
        throw new Error(result.message)
      }

      setData(result.data)
      setIsLoading(false)
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        await instance.acquireTokenRedirect(tokenRequest)
      } else {
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
