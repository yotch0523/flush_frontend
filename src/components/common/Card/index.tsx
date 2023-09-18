import Image from 'next/image'
import styled from 'styled-components'
import CardTag from '~/components/common/Card/Tag'
import { generateHref, ICard } from '~/types/models/Card'

type Props = {
  card: ICard
}
const Card = ({ card }: Props) => {
  return (
    <StyledContainer href={generateHref(card)}>
      <Image src={card.thumbnail} alt={`card-thumbnail-${card.id}`} />
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
