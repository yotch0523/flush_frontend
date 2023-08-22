import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'
import Button from '~/components/common/Button'
import useUser from '~/hooks/useUser'
import { loginRequest } from '~/services/auth/config'
import { User } from '~/types/user'

const Header = () => {
  const u = useUser()
  const { instance } = useMsal()

  const [user, setUser] = useState<User | null | undefined>(null)
  const [isActive, setIsActive] = useState(false)

  const login = () => {
    instance.loginRedirect(loginRequest)
  }

  const logout = () => {
    instance.logout()
  }

  useEffect(() => {
    setIsActive(!!user)
  }, [user])

  useEffect(() => {
    setUser(u)
  }, [u])

  return (
    <>
      {isActive ? (
        <>
          <p>Hello, {user?.givenName} san</p>
          <p>{user?.email}</p>
        </>
      ) : null}
      <Button label={isActive ? 'ログアウト' : 'ログイン'} onClick={user ? logout : login} />
    </>
  )
}

export default Header
