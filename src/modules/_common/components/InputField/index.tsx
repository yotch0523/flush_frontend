import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'
import ImageUploader from '~/modules/_common/components/ImageUploader'
import useFormError from '~/modules/_common/hooks/useFormError'
import { Domain } from '~/modules/_common/types/domain'

type InputType = 'text' | 'textarea' | 'tel' | 'password' | 'email' | 'image'

type Props = {
  formPath: string
  type?: InputType
  label: string
  readOnly?: boolean
  required?: boolean
  helperText?: string
  maxLength?: number
  domain?: Domain
}

const InputField = ({
  formPath,
  label,
  type = 'text',
  readOnly = false,
  required = false,
  helperText = '',
  maxLength = 100,
  domain,
}: Props) => {
  const { register } = useFormContext()
  const { t } = useTranslation()
  const error = useFormError(formPath)

  const generateInput = useCallback(() => {
    switch (type) {
      case 'textarea':
        return (
          <>
            <textarea
              className={!!error ? 'error' : ''}
              {...register(formPath)}
              maxLength={maxLength}
              readOnly={readOnly}
              required={required}
            />
          </>
        )
      case 'image':
        if (!domain) return null
        return (
          <ImageUploader
            domain={domain}
            formPath={formPath}
            maxLength={maxLength}
            readOnly={readOnly}
            required={required}
          />
        )
      default:
        return (
          <>
            <input
              className={!!error ? 'error' : ''}
              type={type}
              {...register(formPath)}
              maxLength={maxLength}
              readOnly={readOnly}
              required={required}
            />
          </>
        )
    }
  }, [])

  const generateHelperText = useCallback(() => {
    return (
      <>
        <div className={!!error ? 'error' : ''}>{error?.message ? t(`${error.message}`) : helperText}</div>
      </>
    )
  }, [error])

  return (
    <StyledContainer>
      <StyledLabelContainer>{label}</StyledLabelContainer>
      <StyledInputContainer>
        {generateInput()}
        {generateHelperText()}
      </StyledInputContainer>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  ${({ theme }) => `padding: ${theme.form.container.padding};`}
`

const StyledLabelContainer = styled.div`
  ${({ theme }) => `padding: 0 ${theme.form.container.padding};`}
  flex-basis: 0;
  flex-grow: 1;
  text-align: right;
`

const StyledInputContainer = styled.div`
  ${({ theme }) => `padding: 0 ${theme.form.container.padding};`}
  flex-basis: 0;
  flex-grow: 1;
`

export default InputField
