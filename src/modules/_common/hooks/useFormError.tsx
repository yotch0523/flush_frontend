import { get as getFromPath } from 'lodash'
import { useFormState } from 'react-hook-form'

const useFormError = (formPath: string) => {
  const formState = useFormState()
  const error = getFromPath(formState.errors, formPath)
  return error
}

export default useFormError
