import { PassThrough, Writable } from 'stream'
import { Fields, Files, formidable } from 'formidable'
import VolatileFile from 'formidable/VolatileFile'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { initContainerClient } from '~/modules/api/_common/services/storage'
import { handler } from '~/modules/api/cards/handler'

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '15mb',
  },
}

const storageContainerName = 'user-images'

const save = async (userId: string, files: Files, req: NextApiRequest) => {
  const requestHeaders: HeadersInit = new Headers()
  const authorizationHeader =
    req.headers instanceof Headers ? req.headers.get('authorization') : req.headers.authorization
  requestHeaders.set('Access-Control-Allow-Credentials', 'true')
  requestHeaders.set('Access-Control-Allow-Origin', process.env.IMAGE_API_BASE_URL ?? '')
  requestHeaders.set('x-functions-key', process.env?.IMAGE_FUNCTIONS_KEY ?? '')
  requestHeaders.set('Authorization', authorizationHeader ?? '')

  const formData = new FormData()
  formData.append('userId', userId)
  formData.append('files', JSON.stringify(files['file']))
  const endpoint = `${process.env.IMAGE_API_BASE_URL}/api/image`

  return await fetch(endpoint, {
    method: req.method,
    headers: requestHeaders,
    body: formData,
  })
}

const postHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.headers instanceof Headers ? req.headers.get('x-user-id') : req.headers['x-user-id']
  if (!(typeof userId === 'string')) return res.status(401).send({ message: 'Unauthorized' })
  const contentType = req.headers instanceof Headers ? req.headers.get('content-type') : req.headers['content-type']

  if (contentType?.includes('multipart/form-data')) {
    // upload blob
    const { files } = await parseMultipleNodeRequest(userId, req)
    // save request
    await save(userId, files, req)
  }
  res.status(200).send({
    data: {
      userId,
      progress: 100,
      message: 'Success',
    },
  })
}

const parseMultipleNodeRequest = (userId: string, req: NextApiRequest): Promise<{ fields: Fields; files: Files }> => {
  return new Promise((resolve, reject) => {
    const uploads: Promise<void>[] = []
    const containerClient = initContainerClient(storageContainerName)
    const fileWriteStreamHandler = (file?: VolatileFile): Writable => {
      if (!file) throw Error('file is empty')
      const body = new PassThrough()
      const fileInfo = file.toJSON()
      const blobClient = containerClient.getBlockBlobClient(`${userId}/${fileInfo.newFilename}`)
      const upload = blobClient.uploadStream(body)
      const uploadRequest: Promise<void> = upload.then((response) => {
        console.log('upload status ', response._response.status)
      })
      uploads.push(uploadRequest)
      return body
    }
    const form = formidable({
      multiples: true,
      fileWriteStreamHandler: fileWriteStreamHandler,
    })
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error)
        return
      }
      Promise.all(uploads)
        .then(() => {
          resolve({ fields, files })
        })
        .catch(reject)
    })
  })
}

export default handler({
  POST: postHandler,
})
