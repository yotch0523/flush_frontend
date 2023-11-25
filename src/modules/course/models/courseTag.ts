import { CourseTagColor } from '~/modules/course/models/courseTagColor'

export interface ICourseTag {
  id: string
  title: string
  color: CourseTagColor
}
