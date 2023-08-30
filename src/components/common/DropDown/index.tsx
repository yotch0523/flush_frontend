import { useState } from 'react'
import { styled } from 'styled-components'
import Menu from '~/components/common/Menu'
import { menu } from '~/types/menu'

type Props = {
  children: React.ReactNode
  height?: string
  width?: string
  backgroundColor?: string
  color?: string
  menus: menu[]
}

const ToggleContainer = styled.div<{ height?: string }>`
  ${({ height }) => `height: ${height ?? 'initial'}`}
`

const CustomUl = styled.ul<{ height?: string }>`
  box-sizing: border-box;
  padding: 10px;
  width: 200px;
  position: absolute;
  ${({ height }) => `inset: ${height ?? '0'} 0 auto auto;`}
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`

const CustomLi = styled.li<{ backgroundColor?: string }>`
  padding: 2px 0;
  width: 100%;
  ${({ backgroundColor }) => `background-color: ${backgroundColor ?? '#fff'}`}
`

const MenuList = (menus: menu[], height?: string) => {
  return (
    <CustomUl height={height}>
      {menus.map((menu) => (
        <CustomLi key={menu.label}>
          <Menu label={menu.label} pathname={menu.pathname} onClick={menu.onClick} />
        </CustomLi>
      ))}
    </CustomUl>
  )
}

const ButtonAnchor = styled.a<{ height?: string; backgroundColor?: string }>`
  border: none;
  ${({ height }) => `height: ${height ?? 'initial'}`};
  width: 100%;
  display: flex;
  ${({ backgroundColor }) => `background: ${backgroundColor ?? 'transparent'};`}
  align-items: center;
  ${({ color }) => `color: ${color ?? 'initial'}`};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

const DropDown = ({ children, height, backgroundColor, color, menus }: Props) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <ToggleContainer
      height={height}
      // onBlur={() => {
      //   setIsActive(false)
      // }}
    >
      <ButtonAnchor
        href='#'
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsActive(!isActive)
          } else {
            setIsActive(false)
          }
        }}
        backgroundColor={backgroundColor}
        height={height}
        color={color}
      >
        {children}
      </ButtonAnchor>
      {isActive ? MenuList(menus, height) : null}
    </ToggleContainer>
  )
}

export default DropDown
