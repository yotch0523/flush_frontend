import styled from 'styled-components'
import CardContainer from '~/components/common/CardContainer'
import HomeLayout from '~/layouts/HomeLayout'

const Home = () => {
  return (
    <HomeLayout>
      <section>
        <h1>カード</h1>
        <CardContainer cards={[]}></CardContainer>
      </section>
    </HomeLayout>
  )
}

export default Home
