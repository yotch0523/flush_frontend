import styled from 'styled-components'

type Props = {
  label: string
  onClick?: (event: Event) => void
  height?: number
  width?: number
  backgroundColor?: string
}

const Button = ({ label, onClick, height, width = 100, backgroundColor }: Props) => {
  if (!onClick) {
    return (
      <StyledButton type={'submit'} height={height} width={width} backgroundColor={backgroundColor}>
        {label}
      </StyledButton>
    )
  }
  return (
    <StyledButton onClick={onClick} height={height} width={width} backgroundColor={backgroundColor}>
      {label}
    </StyledButton>
  )
}

const StyledButton = styled.button<{
  onClick?: (event: Event) => void
  height?: number
  width: number
  backgroundColor?: string
}>`
  border: none;
  border-radius: 6px;
  ${({ theme }) => `padding: ${theme.form.button.padding} 0;`}
  ${({ backgroundColor }) => `background-color: ${backgroundColor ?? 'initial'}`};
  ${({ height }) => `height: ${height ?? 'initial'}px`};
  ${({ width }) => `width: ${width}px`};
  line-height: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export default Button
