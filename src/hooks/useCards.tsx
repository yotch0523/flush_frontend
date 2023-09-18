import { useEffect, useState } from 'react'
import { ICard } from '~/types/models/Card'

type Props = {
  userId?: string
}

const useCards = ({ userId }: Props) => {
  const [cards, setCards] = useState<ICard[] | null>(null)
  if (!userId) throw new Error('Unauthorized')
  // TODO get data with graphql
  useEffect(() => {
    setCards([
      {
        id: '00000001',
        title: 'card1',
        tags: [],
        thumbnail: '',
        description: 'description of card1',
      },
      {
        id: '00000002',
        title: 'card2',
        tags: [],
        thumbnail: '',
        description: 'description of card2',
      },
      {
        id: '00000003',
        title: 'card3',
        tags: [],
        thumbnail: '',
        description: 'description of card3',
      },
      {
        id: '00000004',
        title: 'card4',
        tags: [],
        thumbnail: '',
        description: 'description of card4',
      },
    ])
  }, [])

  return {
    cards,
    setCards,
  }
}

export default useCards
