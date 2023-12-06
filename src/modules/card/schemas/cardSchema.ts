import { object, string } from 'yup'

export const cardSchema = object().shape({
  title: string().max(30).required(),
  // tags: string[]
  thumbnail: string().url().max(1000),
  description: string().max(1000),
})
