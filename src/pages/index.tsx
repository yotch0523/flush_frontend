import styled from 'styled-components'
import CardContainer from '~/components/common/CardContainer'
import CourseContainer from '~/components/common/CourseContainer'
import HomeLayout from '~/layouts/HomeLayout'

const Home = () => {
  return (
    <HomeLayout>
      <StyledSection>
        <h1>カード</h1>
        <CardContainer cards={[]}></CardContainer>
      </StyledSection>
      <StyledSection>
        <h1>コース</h1>
        <CourseContainer courses={[]}></CourseContainer>
      </StyledSection>
    </HomeLayout>
  )
}

// style
const StyledSection = styled.section`
  height: 160px;
  width: 100%;
`

export default Home
