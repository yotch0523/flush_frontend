import { object, string } from 'yup'

export const cardSchema = object().shape({
  title: string().max(50).required(),
  cardCode: string().max(50).required(),
  question: string().max(100).required(),
  answer: string().max(100).required(),
  // tags: string[]
  thumbnail: string().max(1000),
  description: string().max(1000),
})
