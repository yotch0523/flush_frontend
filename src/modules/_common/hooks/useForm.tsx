import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'
import * as ReactHookUseForm from 'react-hook-form'
import z, { ZodType } from 'zod'
import useFetchWithMsal from '~/modules/_common/hooks/useFetchWithMsal'

type Prpos = {
  schema: ZodType<FormData, any, any>
  controller: string
  action: string
  userId: string
}

export const useForm = <T,>({ schema, controller, action, userId }: Prpos) => {
  type FormSchemaType = z.infer<typeof schema>

  const { loading: isLoading, data, fetchError, msalFetch } = useFetchWithMsal<T>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = ReactHookUseForm.useForm<FormSchemaType>({
    resolver: zodResolver(schema),
  })

  const onCancel = () => {
    redirect(`/${userId}/${controller}`)
  }

  const onSubmit = async (formData: FormSchemaType) => {
    try {
      await msalFetch('POST', `/${controller}/${action}`, formData)
    } catch (error) {
      throw error
    }
  }

  return {
    isLoading,
    data,
    register,
    onCancel,
    onSubmit: handleSubmit(onSubmit),
    fetchError,
    errors,
  }
}
