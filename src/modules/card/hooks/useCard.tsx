import useFetchWithMsal from '~/modules/_common/hooks/useFetchWithMsal'

type Response = {
  id: string
}

export const useCard = () => {
  const { loading, msalFetch, fetchError, data } = useFetchWithMsal<Response>('POST', '/cards/create')

  const create = async (body) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await msalFetch(body)
  }

  return {
    loading,
    create,
    error: fetchError,
    data,
  }
}
