import { CourseTagColor } from '~/models/Course/Tag/color'

export interface ICourseTag {
  id: string
  title: string
  color: CourseTagColor
}
