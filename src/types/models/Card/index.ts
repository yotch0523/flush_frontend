import { ICardTag } from '~/types/models/Card/Tag'

export interface ICard {
  id: string
  title: string
  tags: ICardTag[]
  thumbnail: string
  description: string
}

export function generateHref(card?: ICard) {
  if (!card) return '/not-found'
  return `/cards/${card.id}`
}
