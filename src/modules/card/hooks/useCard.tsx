import useFetchWithMsal from '~/modules/_common/hooks/useFetchWithMsal'

export const useCard = () => {
  const { loading, msalFetch, fetchError } = useFetchWithMsal('POST', '/cards')

  const onSubmit = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await msalFetch(data)
  }

  return {
    loading,
    onSubmit,
    error: fetchError,
  }
}
