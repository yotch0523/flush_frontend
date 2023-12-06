import { useFormContext } from 'react-hook-form'
import { styled } from 'styled-components'

type Props = {
  formPath: string
  label: string
  readOnly?: boolean
  required?: boolean
  helperText?: string
  maxLength?: number
}

const TextAreaField = ({
  formPath,
  label,
  readOnly = false,
  required = false,
  helperText = '',
  maxLength = 100,
}: Props) => {
  const { register } = useFormContext()

  return (
    <StyledContainer>
      <StyledLabelContainer>{label}</StyledLabelContainer>
      <StyledInputContainer>
        <textarea {...register(formPath)} maxLength={maxLength} readOnly={readOnly} required={required} />
        <div>{helperText}</div>
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

export default TextAreaField
