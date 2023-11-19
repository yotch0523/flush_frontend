import { useEffect, useState } from 'react'
import CardContainer from '~/components/common/CardContainer'
import ToolBar from '~/components/common/ToolBar'
import useFetchWithMsal from '~/hooks/useFetchWithMsal'
import HomeLayout from '~/layouts/HomeLayout'
import { ICard } from '~/models/Card'

const CardListPage = () => {
  const [cards, setCards] = useState<ICard[]>([])
  const { isLoading, data, fetchError: error, msalFetch } = useFetchWithMsal<ICard[]>('POST', '/cards')

  useEffect(() => {
    void (async () => {
      await msalFetch()
    })()
  }, [])

  useEffect(() => {
    setCards(data || [])
  }, [data])

  const menus = [
    {
      label: '新規作成',
      href: '/cards/create',
    },
  ]

  if (isLoading) {
    return <HomeLayout>Loading...</HomeLayout>
  }

  if (error) {
    setCards([])
    return <HomeLayout>{error.message}</HomeLayout>
  }

  return (
    <HomeLayout>
      <h1>カード</h1>
      <ToolBar menus={menus} />
      <CardContainer cards={cards}></CardContainer>
    </HomeLayout>
  )
}

export default CardListPage
