import Image from 'next/image'
import styled from 'styled-components'
// import CourseTag from '~/components/common/Course/'
import { ICourse } from '~/types/models/Course'

type Props = {
  course: ICourse
}

const Course = ({ course }: Props) => {
  return (
    <StyledContainer>
      <Image src={course.thumbnail} alt={`course-thumbnail-${course.id}`} />
      <StyledTagContainer>
        {/* {course.tags.map((tag, index) => (
        <CourseTag tag={tag} key={`card-tag-${index}`} />
      ))} */}
      </StyledTagContainer>
      <StyledParagraph>{course.title}</StyledParagraph>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  padding: 10px;
  height: 100%;
  width: 100%;
  display: block;
`

const StyledParagraph = styled.p`
  font-weight: bold;
`

const StyledTagContainer = styled.div`
  display: flex;
  width: 100%;
`

export default Course
