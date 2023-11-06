import { useEffect } from 'react'
import styled from 'styled-components'
import CardContainer from '~/components/common/CardContainer'
import CourseContainer from '~/components/common/CourseContainer'
import useFetchWithMsal from '~/hooks/useFetchWithMsal'
import HomeLayout from '~/layouts/HomeLayout'
import { ICard } from '~/models/Card'

const Home = () => {
  const { isLoading, data: cards, fetchError: error, msalFetch } = useFetchWithMsal<ICard[]>('POST', '/cards')

  useEffect(() => {
    void (async () => {
      await msalFetch()
    })()
  }, [])

  if (isLoading) {
    return <HomeLayout>Loading...</HomeLayout>
  }

  if (error) {
    return <HomeLayout>{error.message}</HomeLayout>
  }

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
  height: auto;
  width: 100%;
`

export default Home
