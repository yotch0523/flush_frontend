import { ICourseTag } from '~/models/Course/Tag'

export interface ICourse {
  id: string
  title: string
  tags: ICourseTag[]
  thumbnail: string
}

export const generateHref = (course?: ICourse) => {
  if (!course) return `/not-found`
  return `/courses/${course.id}`
}
