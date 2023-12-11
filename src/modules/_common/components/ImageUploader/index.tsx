import { ChangeEvent, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import useFileUpload from '~/modules/_common//hooks/useFileUpload'
import { Domain } from '~/modules/_common/types/domain'

type Props = {
  domain: Domain
  formPath: string
  readOnly?: boolean
  required?: boolean
  helperText?: string
  maxLength?: number
}

const ImageUploader = ({ domain, formPath, maxLength, readOnly, required }: Props) => {
  const { blobPath, upload } = useFileUpload({ domain })
  const { register } = useFormContext()

  const onFileSelected = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const file = event.target.files[0]
    await upload(file)
  }, [])

  // customize according to https://qiita.com/d0ne1s/items/dd0ffa707ffe051969d7
  return (
    <label htmlFor={formPath}>
      <input id={formPath} type={'file'} accept={'image/png, image/jpeg'} onChange={onFileSelected} />
      <input
        type={'hidden'}
        {...register(formPath)}
        maxLength={maxLength}
        readOnly={readOnly}
        required={required}
        value={blobPath ?? ''}
      />
    </label>
  )
}

export default ImageUploader
