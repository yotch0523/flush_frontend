import styled from 'styled-components'
import Course from '~/components/common/Course'
import { ICourse } from '~/models/Course'

type Props = {
  courses: ICourse[]
}

const CourseContainer = ({ courses }: Props) => {
  if (courses.length === 0) {
    return (
      <StyledBlankContainer>
        <p>取得できるコースがまだありません</p>
      </StyledBlankContainer>
    )
  }
  return (
    <StyledContainer>
      {courses.map((course, index) => (
        <Course course={course} key={`course-${index}`} />
      ))}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`

const StyledBlankContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export default CourseContainer
