import styled from 'styled-components'
import Card from '~/components/common/Card'
import { ICard } from '~/types/models/Card'

type Props = {
  cards: ICard[]
}

const CardContainer = ({ cards }: Props) => {
  if (cards.length === 0) {
    return (
      <StyledBlankContainer>
        <p>取得できるカードがまだありません</p>
      </StyledBlankContainer>
    )
  } else {
    return (
      <StyledContainer>
        {cards.map((card, index) => (
          <Card card={card} key={`card-${index}`} />
        ))}
      </StyledContainer>
    )
  }
}

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
`

const StyledBlankContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`
export default CardContainer
