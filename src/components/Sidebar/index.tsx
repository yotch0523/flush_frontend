import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Menu from '~/components/common/Menu'
import { AppContext, AppContextType } from '~/providers/app'
import { menu } from '~/types/menu'

type Props = {
  backgroundColor?: string
  color?: string
}

const menus: menu[] = [
  {
    label: 'dummy1',
    pathname: '#',
  },
  {
    label: 'dummy2',
    pathname: '#',
  },
  {
    label: 'dummy3',
    pathname: '#',
  },
  {
    label: 'dummy4',
    pathname: '#',
  },
]

const Sidebar = ({ backgroundColor, color }: Props) => {
  const [isActive, setIsActive] = useState<boolean>()
  const contextName = AppContextType.IsSidebarVisible
  const dispatches = useContext(AppContext)

  useEffect(() => {
    dispatches[contextName] = setIsActive
    return () => {
      delete dispatches[contextName]
    }
  }, [contextName])

  if (isActive) {
    return (
      <Nav backgroundColor={backgroundColor}>
        {menus.map((menu, index) => (
          <Menu key={`sidebar-menu-${index}`} color={color} label={menu.label} pathname={menu.pathname} />
        ))}
      </Nav>
    )
  } else {
    return null
  }
}

const Nav = styled.nav<{ backgroundColor?: string }>`
  padding-top: 40px;
  height: 100%;
  width: 200px;
  display: flex;
  ${({ backgroundColor }) => `background-color: ${backgroundColor ?? 'initial'};`}
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
`

export default Sidebar
