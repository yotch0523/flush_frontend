import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { customFetch, handler } from '~/modules/api/handler'

const postHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cards = await customFetch('POST', '/cards', req)
  return res.status(200).send(cards)
}

export default handler({
  POST: postHandler,
})
