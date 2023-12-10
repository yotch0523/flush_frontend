import { get } from 'lodash'
import { useFormContext } from 'react-hook-form'

const useFormError = (formPath: string) => {
  const context = useFormContext<{ [key: string]: string }>()
  const {
    formState: { errors },
  } = context
  const error = get(errors, formPath)
  return error
}

export default useFormError
