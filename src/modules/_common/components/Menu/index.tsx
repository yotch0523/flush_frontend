import Link from 'next/link'
import styled from 'styled-components'
import Button from '~/modules/_common/components/Button'
import { menu } from '~/modules/_common/types/menu'

type Props = {
  color?: string
} & menu

const Menu = ({ color, label, href: pathname, query, onClick }: Props) => {
  if (pathname) {
    return (
      <StyledContainer color={color}>
        <Link href={{ pathname, query }}>{label}</Link>
      </StyledContainer>
    )
  }
  if (onClick) {
    return (
      <StyledContainer color={color}>
        <Button label={label} onClick={onClick} />
      </StyledContainer>
    )
  }
  return null
}

const StyledContainer = styled.div<{ color?: string }>`
  width: 100%;
  text-align: center;
  & > * {
    width: 100%;
    ${({ color }) => `color: ${color ?? 'initial'};`}
  }
`

export default Menu
