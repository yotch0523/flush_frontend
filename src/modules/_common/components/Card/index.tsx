import Image from 'next/image'
import styled from 'styled-components'
import CardTag from '~/modules/_common/components/Card/Tag'
import { ICard } from '~/modules/card/models/card'

type Props = {
  card: ICard
}
const Card = ({ card }: Props) => {
  return (
    <StyledContainer href={`/cards/${card.id}`}>
      <Image src={card.thumbnail} alt={`card-thumbnail-${card.id}`} height={100} width={100} />
      <StyledTagContainer>
        {card.tags.map((tag, index) => (
          <CardTag tag={tag} key={`card-tag-${index}`} />
        ))}
      </StyledTagContainer>
      <StyledParagraph>{card.title}</StyledParagraph>
    </StyledContainer>
  )
}

const StyledContainer = styled.a`
  padding: 10px;
  height: 100%;
  display: block;
`

const StyledParagraph = styled.p`
  font-weight: bold;
`

const StyledTagContainer = styled.div`
  display: flex;
  width: 100%;
`

export default Card
