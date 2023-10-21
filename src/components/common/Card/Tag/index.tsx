import styled from 'styled-components'
import { ICardTag } from '~/models/Card/Tag'
import { getColorCode } from '~/models/Card/Tag/color'

type Props = {
  tag: ICardTag
}

const CardTag = ({ tag }: Props) => {
  return <StyledContainer color={getColorCode(tag.color)}></StyledContainer>
}

const StyledContainer = styled.div`
  padding: 4px 8px;
  height: 12px;
  line-height: 12px;
  ${(props) => `background-color: ${props.color}`}
  color: #fff;
`

export default CardTag
