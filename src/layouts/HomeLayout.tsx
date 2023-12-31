import styled from 'styled-components'
import Breadcrumb from '~/modules/_common/components/Breadcrumb'

type Props = {
  children: React.ReactNode
}

const HomeLayout = ({ children }: Props) => {
  return (
    <StyledContainer>
      <Breadcrumb />
      {children}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  padding: 20px 12px;
  margin: 0 auto;
  width: 100%;
  ${({ theme }) => theme.media.lg} {
    ${(props) => `max-width: ${props.theme.content.pc.maxWidth}`}
  }
`

export default HomeLayout
