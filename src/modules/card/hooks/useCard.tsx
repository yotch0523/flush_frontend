import useFetchWithMsal from '~/modules/_common/hooks/useFetchWithMsal'

type Response = {
  id: string
}

export const useCard = () => {
  const { loading, msalFetch, fetchError, data } = useFetchWithMsal<Response>()

  const create = async (body) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await msalFetch('POST', '/api/cards/create', body)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    loading,
    create,
    error: fetchError,
    data,
  }
}
