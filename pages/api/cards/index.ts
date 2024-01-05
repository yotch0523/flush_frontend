import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { handler } from '~/modules/api/cards/handler'

const postHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const options = {
    method: 'POST',
    headers: new Headers(),
    body: req.body,
  }
  // API_ENDPOINT
  const response = await fetch(process.env.API_ENDPOINT + '/cards', options)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return res.status(200).send({
    userId,
    progress: 100,
    message: 'Success',
    newFilename,
    originalFilename,
  })
}

export default handler({
  POST: postHandler,
})
