import { useState } from 'react'
import { styled } from 'styled-components'
import Button from '~/components/common/Button'
import Menu from '~/components/common/Menu'
import { menu } from '~/types/menu'

type Props = {
  label: string
  height?: string
  color?: string
  menus: menu[]
}

const MenuList = (menus: menu[]) => {
  return (
    <ul>
      {menus.map((menu) => (
        <Menu key={menu.label} label={menu.label} pathname={menu.pathname} onClick={menu.onClick} />
      ))}
    </ul>
  )
}

const DropDown = ({ label, height, color, menus }: Props) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <ToggleContainer height={height}>
      <Button
        label={label}
        onClick={() => {
          setIsActive(!isActive)
        }}
        height={height}
        color={color}
      />
      {isActive ? MenuList(menus) : null}
    </ToggleContainer>
  )
}

const ToggleContainer = styled.div<{ height?: string }>`
  ${({ height }) => `height: ${height ?? 'initial'}`}
`

export default DropDown
