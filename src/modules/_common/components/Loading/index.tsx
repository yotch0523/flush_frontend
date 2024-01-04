type Props = {
  message?: string
}

const Loading = ({ message = 'Loading...' }: Props) => {
  return <div>{message}</div>
}

export default Loading
