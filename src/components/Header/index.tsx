import { useMsal } from '@azure/msal-react'
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import DropDown from '~/components/common/DropDown'
import { ui } from '~/consts/ui'
import useUser from '~/hooks/useUser'
import { getFullName, IUser } from '~/models/user'
import { AppContext, AppContextType } from '~/providers/app'

const height = '40px'

type Props = {
  backgroundColor?: string
}

const Header = ({ backgroundColor }: Props) => {
  const u = useUser()
  const { instance } = useMsal()
  const [user, setUser] = useState<IUser | null | undefined>(null)
  const dispatches = useContext(AppContext)

  useEffect(() => {
    setUser(u)
  }, [])

  const logout = async () => {
    await instance.logout()
  }

  const menus = [
    {
      label: 'ログアウト',
      onClick: logout,
    },
    {
      label: 'ダミー',
      onClick: () => {},
    },
  ]

  return (
    <MyHeader backgroundColor={backgroundColor}>
      <SideBarCollapseButton>
        <GiHamburgerMenu onClick={() => dispatches[AppContextType.IsSidebarVisible]?.((v) => !(v || false))} />
      </SideBarCollapseButton>

      <DropDown height={height} color='#fff' menus={menus}>
        {getFullName(user) ?? ''}
      </DropDown>
    </MyHeader>
  )
}

const MyHeader = styled.header<{ backgroundColor?: string }>`
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  height: ${height};
  display: flex;
  ${({ backgroundColor }) => `background: ${backgroundColor ?? ui.backgroundColor.main};`}
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
