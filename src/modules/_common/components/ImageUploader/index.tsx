import Image from 'next/image'
import { ChangeEvent, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'
import useFileUpload from '~/modules/_common//hooks/useFileUpload'
import Loading from '~/modules/_common/components/Loading'
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
  const { loading, fileName, blobPath, upload } = useFileUpload({ domain })
  const { register } = useFormContext()
  const { t } = useTranslation()

  const onFileSelected = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const file = event.target.files[0]
    await upload(file)
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <StyledLabel htmlFor={formPath}>{t('common.form.file.label')}</StyledLabel>
      <StyledInput id={formPath} type={'file'} accept={'image/*'} onChange={onFileSelected} />
      <input
        type={'hidden'}
        {...register(formPath)}
        maxLength={maxLength}
        readOnly={readOnly}
        required={required}
        value={blobPath ?? ''}
      />
      {blobPath ? <Image height={100} width={100} src={blobPath} alt={fileName ?? 'uploadedImage'} /> : null}
    </>
  )
}

const StyledLabel = styled.label`
  border: none;
  border-radius: 6px;
  padding: 10px 10px;
  display: inline-block;
  width: 160px;
  ${({ theme }) => `color: ${theme.color.white};`}
  ${({ theme }) => `background-color: ${theme.color.primary};`}
  cursor: pointer;
`

const StyledInput = styled.input`
  display: none;
`

export default ImageUploader
