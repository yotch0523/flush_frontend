import { AccountInfo } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import { IUser } from '~/models/user'

interface Account extends AccountInfo {
  idTokenClaims: {
    aud: string
    auth_time: number
    family_name: string
    given_name: string
    emails: string[]
    iss: string
    nbf: number
    nonce: string
    sub: string
    tfp: string
    ver: string
  }
}

const useUser = (): IUser | null | undefined => {
  const { accounts } = useMsal()
  if (accounts.length > 0) {
    const account = accounts[0] as Account
    const user: IUser = {
      sub: account.idTokenClaims?.sub,
      familyName: account.idTokenClaims?.family_name,
      givenName: account.idTokenClaims?.given_name,
      email: account.idTokenClaims?.emails[0],
    }
    return user
  }
  return null
}

export default useUser
