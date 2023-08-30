import Link from 'next/link'
import styled from 'styled-components'
import Button from '~/components/common/Button'
import { menu } from '~/types/menu'

type Props = {
  color?: string
} & menu

const Menu = ({ color, label, pathname, query, onClick }: Props) => {
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
  padding: 10px;
  & > * {
    ${({ color }) => `color: ${color ?? 'initial'};`}
  }
`

export default Menu
