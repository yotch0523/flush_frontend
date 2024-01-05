import { useEffect, useState } from 'react'
import HomeLayout from '~/layouts/HomeLayout'
import Loading from '~/modules/_common/components/Loading'
import useFetchWithMsal from '~/modules/_common/hooks/useFetchWithMsal'

type Response = {
  message: string
}

const HealthCheckPage = () => {
  const { loading, fetchError, data, msalFetch } = useFetchWithMsal<Response>()
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    void msalFetch('GET', '/api/healthcheck', null, 'application/json')
  }, [])

  useEffect(() => {
    if (data) {
      setMessage(data.message)
    }
  }, [data])

  if (loading) {
    return (
      <HomeLayout>
        <Loading />
      </HomeLayout>
    )
  }

  if (fetchError) {
    return <HomeLayout>error: {fetchError}</HomeLayout>
  }
  return <HomeLayout>message: {message}</HomeLayout>
}

export default HealthCheckPage
