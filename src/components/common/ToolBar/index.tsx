import styled from 'styled-components'
import DropDown from '~/components/common/DropDown'
import { menu } from '~/types/menu'

type Props = {
  menus: menu[]
}

const ToolBar = ({ menus }: Props) => {
  return (
    <StyledContainer>
      <div className={'search'}>検索</div>
      <DropDown height={'40px'} width={'120px'} menus={menus}>
        アクション
      </DropDown>
    </StyledContainer>
  )
}

// style
const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
`
export default ToolBar
