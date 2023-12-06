import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { InferType } from 'yup'
import HomeLayout from '~/layouts/HomeLayout'
import Button from '~/modules/_common/components/Button'
import TextAreaField from '~/modules/_common/components/TextAreaField'
import TextField from '~/modules/_common/components/TextField'
import { theme } from '~/modules/_common/themes'
import { useCard } from '~/modules/card/hooks/useCard'
import { cardSchema } from '~/modules/card/schemas/cardSchema'

type CreateCardForm = InferType<typeof cardSchema>

const CreateCardPage = () => {
  const { t } = useTranslation()
  const { onSubmit } = useCard()
  const formMethods = useForm<CreateCardForm>({
    defaultValues: {
      title: '',
      thumbnail: '',
      description: '',
    },
    resolver: yupResolver(cardSchema),
  })

  const { handleSubmit } = formMethods

  return (
    <HomeLayout>
      <h1>Card Create Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          <TextField formPath={'title'} label={t('card.form.title')} required={true} maxLength={30} />
          <TextField formPath={'thumbnail'} label={t('card.form.thumbnail')} required={true} maxLength={30} />
          <TextAreaField formPath={'description'} label={t('card.form.description')} required={true} maxLength={1000} />
        </FormProvider>
      </form>
      <Button label={t('common.form.register')} backgroundColor={theme.form.button.color} />
    </HomeLayout>
  )
}

export default CreateCardPage
