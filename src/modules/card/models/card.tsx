import { ICardTag } from '~/modules/card/models/cardTag'

export interface ICard {
  id: string
  title: string
  tags: ICardTag[]
  thumbnail: string
  description: string
  createdAt: Date
  updatedAt: Date
}
