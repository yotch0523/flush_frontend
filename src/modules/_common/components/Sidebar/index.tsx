import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Links from '~/modules/_common/components/Sidebar/Links'
import { AppContext, AppContextType } from '~/providers/app'

type Props = {
  backgroundColor?: string
  color?: string
}

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
      <>
        <Nav backgroundColor={backgroundColor}>
          <Links backgroundColor={backgroundColor} color={color} />
        </Nav>
        <StyledOverlay
          onClick={() => {
            dispatches[AppContextType.IsSidebarVisible]?.(() => false)
          }}
        />
      </>
    )
  } else {
    return null
  }
}

// style
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
  z-index: 1;
`

const StyledOverlay = styled.div`
  height: 100%;
  width: 100%;
  opacity: 0;
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
`

export default Sidebar
