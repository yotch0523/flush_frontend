import styled from 'styled-components'
import CardContainer from '~/components/common/CardContainer'
import CourseContainer from '~/components/common/CourseContainer'
import useCards from '~/hooks/useCards'
import useUser from '~/hooks/useUser'
import HomeLayout from '~/layouts/HomeLayout'

const Home = () => {
  const user = useUser()
  const { cards } = useCards({ userId: user?.aud ?? undefined })
  return (
    <HomeLayout>
      <StyledSection>
        <h1>カード</h1>
        <CardContainer cards={cards}></CardContainer>
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
