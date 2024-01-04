import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { storageService } from '~/modules/api/_common/services/storage'
import { handler } from '~/modules/api/cards/handler'

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '15mb',
  },
}

const postHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.headers instanceof Headers ? req.headers.get('x-user-id') : req.headers['x-user-id']
  if (!(typeof userId === 'string')) return res.status(401).send({ message: 'Unauthorized' })
  const contentType = req.headers instanceof Headers ? req.headers.get('content-type') : req.headers['content-type']

  if (contentType?.includes('multipart/form-data')) {
    const { files } = await storageService.upload({
      userId,
      domain: 'card',
      req,
    })
    const { newFilename, originalFilename } = files.file ? files.file[0] : { newFilename: '', originalFilename: '' }
    return res.status(200).send({
      userId,
      progress: 100,
      message: 'Success',
      newFilename,
      originalFilename,
    })
  } else {
    return res.status(200).send({
      userId,
      progress: 100,
      message: 'Success',
    })
  }
}

export default handler({
  POST: postHandler,
})
