import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useFetchWithMsal from '~/modules/_common/hooks/useFetchWithMsal'
import { Domain } from '~/modules/_common/types/domain'

type Props = {
  domain: Domain
}

type UploadImageResponse = {
  userId: string
  progress: number
  message: string
  blobName: string
}

const useFileUpload = ({ domain }: Props) => {
  const [blobPath, setBlobPath] = useState<string | null>(null)
  const { t } = useTranslation()
  const { data, msalFetch } = useFetchWithMsal<UploadImageResponse>('POST', `/api/${domain}/image`)

  const upload = useCallback(async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      await msalFetch(formData)
    } catch (error) {
      throw new Error(t('common.form.file.events.error'))
    }
  }, [])

  useEffect(() => {
    if (!data || data.progress < 100) return
    setBlobPath(`/${data.userId}/${domain}/${data.blobName}`)
  }, [data])

  return {
    blobPath,
    upload,
  }
}

export default useFileUpload
