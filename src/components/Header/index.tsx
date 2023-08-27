import { useMsal } from '@azure/msal-react'
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import DropDown from '~/components/common/DropDown'
import useUser from '~/hooks/useUser'
import { getFullName, IUser } from '~/models/user'

const height = '40px'

const Header = () => {
  const u = useUser()
  const { instance } = useMsal()
  const [user, setUser] = useState<IUser | null | undefined>(null)

  useEffect(() => {
    setUser(u)
  }, [])

  const logout = () => {
    instance.logout()
  }

  const menus = [
    {
      label: 'ログアウト',
      onClick: logout,
    },
  ]

  return (
    <MyHeader>
      <SideBarCollapseButton href='#'>
        <GiHamburgerMenu />
      </SideBarCollapseButton>
      <DropDown label={getFullName(user) ?? ''} height={height} color='#fff' menus={menus} />
    </MyHeader>
  )
}

const MyHeader = styled.header`
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  height: ${height};
  display: flex;
  background: #1c1c1c;
  justify-content: space-between;
  position: fixed;
`

const SideBarCollapseButton = styled.a`
  display: flex;
  color: #fff;
  align-items: center;

  * {
    color: #fff;
  }
`

export default Header
