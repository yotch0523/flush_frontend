import { useFormContext } from 'react-hook-form'
import { styled } from 'styled-components'

type InputType = 'text' | 'textarea' | 'tel' | 'password' | 'email'

type Props = {
  formPath: string
  type?: InputType
  label: string
  readOnly?: boolean
  required?: boolean
  helperText?: string
  maxLength?: number
}

const TextField = ({
  formPath,
  label,
  type = 'text',
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
        <input type={type} {...register(formPath)} maxLength={maxLength} readOnly={readOnly} required={required} />
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

export default TextField
