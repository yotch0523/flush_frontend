import styled from 'styled-components'

type Props = {
  label: string
  onClick?: (event: Event) => void
  height?: string
  backgroundColor?: string
}

const Button = ({ label, onClick, height, backgroundColor }: Props) => {
  if (!onClick) {
    return (
      <StyledButton type={'submit'} height={height} backgroundColor={backgroundColor}>
        {label}
      </StyledButton>
    )
  }
  return (
    <StyledButton onClick={onClick} height={height} backgroundColor={backgroundColor}>
      {label}
    </StyledButton>
  )
}

const StyledButton = styled.button<{ onClick?: (event: Event) => void; height?: string; backgroundColor?: string }>`
  border: none;
  ${({ theme }) => `padding: ${theme.form.button.padding} 0;`}
  ${({ backgroundColor }) => `background-color: ${backgroundColor ?? 'initial'}`};
  ${({ height }) => `height: ${height ?? 'initial'}`};
  width: 100%;
  line-height: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export default Button
