import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { InferType } from 'yup'
import HomeLayout from '~/layouts/HomeLayout'
import Button from '~/modules/_common/components/Button'
import InputField from '~/modules/_common/components/InputField'
import Loading from '~/modules/_common/components/Loading'
import { theme } from '~/modules/_common/themes'
import { useCard } from '~/modules/card/hooks/useCard'
import { cardSchema } from '~/modules/card/schemas/cardSchema'

type CreateCardForm = InferType<typeof cardSchema>

const CreateCardPage = () => {
  const { t } = useTranslation()
  const { loading, create, error } = useCard()
  const formMethods = useForm<CreateCardForm>({
    defaultValues: {
      title: '',
      thumbnail: '',
      cardCode: '',
      question: '',
      answer: '',
      description: '',
    },
    resolver: yupResolver(cardSchema),
  })

  const { handleSubmit } = formMethods

  const onSubmit = async (data) => {
    data = {
      ...data,
      tags: [],
    }
    await create(data)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <HomeLayout>
      <h1>Card Create Page</h1>
      {error ? (
        <>
          <div>{error.message}</div>
        </>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          <InputField key={'title'} formPath={'title'} label={t('card.form.title')} required={true} maxLength={30} />
          <InputField
            key={'cardCode'}
            type={'text'}
            formPath={'cardCode'}
            label={t('card.form.cardCode')}
            required={true}
            maxLength={30}
          />
          <InputField
            key={'thumbnail'}
            type={'image'}
            formPath={'thumbnail'}
            label={t('card.form.thumbnail')}
            required={true}
            maxLength={1000}
            domain='cards'
          />
          <InputField
            key={'question'}
            type={'text'}
            formPath={'question'}
            label={t('card.form.question')}
            required={true}
            maxLength={1000}
          />
          <InputField
            key={'answer'}
            type={'text'}
            formPath={'answer'}
            label={t('card.form.answer')}
            required={true}
            maxLength={1000}
          />
          <InputField
            key={'description'}
            type={'textarea'}
            formPath={'description'}
            label={t('card.form.description')}
            required={true}
            maxLength={1000}
          />
          <StyledButtonContainer>
            <Button label={t('common.form.register')} backgroundColor={theme.form.button.color} width={200} />
          </StyledButtonContainer>
        </FormProvider>
      </form>
    </HomeLayout>
  )
}

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export default CreateCardPage
