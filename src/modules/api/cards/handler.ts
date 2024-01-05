import appInsights, { defaultClient } from 'applicationinsights'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { HTTP_METHOD, isHTTPMethod } from 'next/dist/server/web/http'
import { errorHandler } from '~/modules/api/cards/errorHandler'

export type Handlers = {
  [key in HTTP_METHOD]?: NextApiHandler
}

export const handler = (handlers: Handlers) => {
  appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start()
  appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'flush-app'
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req
    if (!method || !isHTTPMethod(method)) {
      return res.status(405).json({
        error: {
          message: `${req.method} method is not allowed`,
          statusCode: 405,
        },
      })
    }
    const handler = handlers[method]

    if (!handler) {
      return res.status(405).json({
        error: {
          message: `${req.method} method is not allowed`,
          statusCode: 405,
        },
      })
    }

    try {
      await handler(req, res)
    } catch (error) {
      if (error instanceof Error) {
        const exception = new Error(error.message, { cause: error })
        defaultClient.trackException({
          exception,
        })
        errorHandler(error, res)
      }

      const exception = new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: JSON.stringify(error),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      )
      defaultClient.trackException({
        exception,
      })
      errorHandler(error, res)
    }
  }
}
