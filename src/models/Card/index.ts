import { ICardTag } from '~/models/Card/Tag'

export interface ICard {
  id: string
  title: string
  tags: ICardTag[]
  thumbnail: string
  description: string
  createdAt: Date
  updatedAt: Date
}
