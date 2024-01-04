import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { handler } from '~/modules/api/cards/handler'

const getHandler: NextApiHandler = (_: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).send({
    message: 'OK',
  })
}

export default handler({
  GET: getHandler,
})
