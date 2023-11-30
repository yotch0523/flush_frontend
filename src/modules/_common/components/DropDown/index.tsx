import { useState } from 'react'
import { styled } from 'styled-components'
import Menu from '~/modules/_common/components/Menu'
import { theme } from '~/modules/_common/themes'
import { menu } from '~/modules/_common/types/menu'

type Props = {
  children: React.ReactNode
  height?: string
  width?: string
  backgroundColor?: string
  color?: string
  menus: menu[]
}

const MenuList = (menus: menu[], height?: string) => {
  return (
    <StyledUl height={height}>
      {menus.map((menu) => (
        <StyledLi key={menu.label}>
          <Menu label={menu.label} href={menu.href} onClick={menu.onClick} />
        </StyledLi>
      ))}
    </StyledUl>
  )
}

const DropDown = ({ children, height, width, backgroundColor, color, menus }: Props) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <ToggleContainer
      height={height}
      width={width}
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

// style
const ToggleContainer = styled.div<{ height?: string; width?: string }>`
  ${({ height }) => `height: ${height ?? 'initial'}`};
  ${({ width }) => `width: ${width ?? 'initial'}`};
  display: inline-block;
  position: relative;
`

const StyledUl = styled.ul<{ height?: string }>`
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  position: absolute;
  ${({ height }) => `inset: ${height ?? '0'} 0 auto auto;`}
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`

const StyledLi = styled.li<{ backgroundColor?: string }>`
  width: 100%;
  ${({ backgroundColor }) => `background-color: ${backgroundColor ?? '#fff'}`}
`

const ButtonAnchor = styled.a<{ height?: string; backgroundColor?: string }>`
  border: none;
  border-radius: 4px;
  ${({ height }) => `height: ${height ?? 'initial'}`};
  width: 100%;
  display: flex;
  ${({ backgroundColor }) => `background: ${backgroundColor ?? theme.backgroundColor.sub};`}
  justify-content: center;
  align-items: center;
  ${({ color }) => `color: ${color ?? 'initial'}`};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`
