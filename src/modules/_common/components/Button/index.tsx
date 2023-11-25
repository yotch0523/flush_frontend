import styled from 'styled-components'

type Props = {
  label: string
  onClick: (event: Event) => void
  height?: string
  color?: string
}

const Button = ({ label, onClick, height, color }: Props) => {
  return (
    <CustomButton onClick={onClick} height={height} color={color}>
      {label}
    </CustomButton>
  )
}

const CustomButton = styled.button<{ onClick: (event: Event) => void; height?: string; color?: string }>`
  border: none;
  background: transparent;
  ${({ height }) => `height: ${height ?? 'initial'}`};
  width: 100%;
  line-height: 100%;
  ${({ color }) => `color: ${color ?? 'initial'}`};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export default Button
