import { PassThrough, Writable } from 'stream'
import { Fields, Files, formidable } from 'formidable'
import VolatileFile from 'formidable/VolatileFile'
import { NextApiRequest } from 'next'
import { initContainerClient } from '~/modules/api/_common/services/storage'

const storageContainerName = 'user-images'

export const parseMultipleNodeRequest = (
  userId: string,
  domain: string,
  req: NextApiRequest,
): Promise<{ fields: Fields; files: Files }> => {
  return new Promise((resolve, reject) => {
    const uploads: Promise<void>[] = []
    const containerClient = initContainerClient(storageContainerName)
    const fileWriteStreamHandler = (file?: VolatileFile): Writable => {
      if (!file) throw Error('file is empty')
      const body = new PassThrough()
      const fileInfo = file.toJSON()
      const blobClient = containerClient.getBlockBlobClient(`${userId}/${domain}/${fileInfo.newFilename}`)
      const upload = blobClient.uploadStream(body)
      const uploadRequest: Promise<void> = upload.then((response) => {
        console.log('upload status ', response._response.status)
      })
      uploads.push(uploadRequest)
      return body
    }
    const form = formidable({
      multiples: true,
      fileWriteStreamHandler,
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
