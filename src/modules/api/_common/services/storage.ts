import { PassThrough, Writable } from 'stream'
import { DefaultAzureCredential } from '@azure/identity'
import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  BlobServiceClient,
  generateAccountSASQueryParameters,
  SASProtocol,
  StorageSharedKeyCredential,
} from '@azure/storage-blob'
import { Fields, Files, formidable } from 'formidable'
import VolatileFile from 'formidable/VolatileFile'
import { NextApiRequest } from 'next'

export const storageContainerName = 'user-images'
const SAS_TTL = 10 // minutes

const blobServiceClient = Object.freeze(
  new BlobServiceClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    new DefaultAzureCredential(),
  ),
)

const containerClient = Object.freeze(blobServiceClient.getContainerClient(storageContainerName))

const storageSharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME ?? '',
  process.env.AZURE_STORAGE_ACCOUNT_KEY ?? '',
)

export const storageService = {
  upload({
    userId,
    domain,
    req,
  }: {
    userId: string
    domain: 'card' | 'cource'
    req: NextApiRequest
  }): Promise<{ fields: Fields; files: Files }> {
    return new Promise((resolve, reject) => {
      const uploads: Promise<void>[] = []
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
  },
  generateSAS(permission: 'r' | 'w' | 'd') {
    const options = {
      services: AccountSASServices.parse('b').toString(),
      resourceTypes: AccountSASResourceTypes.parse('sco').toString(),
      permissions: AccountSASPermissions.parse(permission),
      protocol: SASProtocol.Https,
      expiresOn: new Date(new Date().valueOf() + SAS_TTL * 60 * 1000),
    }

    return generateAccountSASQueryParameters(options, storageSharedKeyCredential).toString()
  },
}
