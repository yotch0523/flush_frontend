import { ICourseTag } from '~/modules/course/models/courseTag'

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
