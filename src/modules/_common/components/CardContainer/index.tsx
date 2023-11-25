import styled from 'styled-components'
import Card from '~/modules/_common/components/Card'
import { ICard } from '~/modules/card/models/card'

type Props = {
  cards: ICard[] | null
}

const CardContainer = ({ cards }: Props) => {
  if (!cards) {
    return (
      <StyledBlankContainer>
        <p>取得できるカードがまだありません</p>
      </StyledBlankContainer>
    )
  } else {
    return (
      <StyledContainer>
        {cards ? cards.map((card, index) => <Card card={card} key={`card-${index}`} />) : <>カードが見つかりません。</>}
      </StyledContainer>
    )
  }
}

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  & > * {
    width: 50%;

    ${({ theme }) => theme.media.lg} {
      width: 25%;
    }
  }
`

const StyledBlankContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`
export default CardContainer
