type Props = {
  label: string
  onClick: () => void
}

const Button: React.FC<Props> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>
}

export default Button
