import { useEffect, useState } from 'react'
import styled from 'styled-components'
import HomeLayout from '~/layouts/HomeLayout'
import CardContainer from '~/modules/_common/components/CardContainer'
import CourseContainer from '~/modules/_common/components/CourseContainer'
import useFetchWithMsal from '~/modules/_common/hooks/useFetchWithMsal'
import { ICard } from '~/modules/card/models/card'

const Home = () => {
  const [cards, setCards] = useState<ICard[] | null>(null)
  const { loading: isLoading, data, fetchError: error, msalFetch } = useFetchWithMsal<ICard[] | null>()

  useEffect(() => {
    void (async () => {
      await msalFetch('POST', '/cards', null)
    })()
  }, [])

  useEffect(() => {
    setCards(data)
  }, [data])

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
