import { useEffect } from 'react'
import styled from 'styled-components'
import CardContainer from '~/components/common/CardContainer'
import CourseContainer from '~/components/common/CourseContainer'
import useFetchWithMsal from '~/hooks/useFetchWithMsal'
import useUser from '~/hooks/useUser'
import HomeLayout from '~/layouts/HomeLayout'
import { ICard } from '~/models/Card'

const Home = () => {
  console.info('start rendering')
  const user = useUser()
  const { isLoading, data: cards, error, execute } = useFetchWithMsal<ICard[]>('GET', `/cards/${user?.aud ?? ''}`, null)
  console.info('cards :', cards)

  useEffect(() => {
    void (async () => {
      await execute()
    })()
  }, [])

  if (isLoading) {
    return <HomeLayout>Loading...</HomeLayout>
  }

  if (error) {
    return <HomeLayout>{error}</HomeLayout>
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
