import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { HTTP_METHOD, isHTTPMethod } from 'next/dist/server/web/http'
import { errorHandler } from '~/modules/api/cards/errorHandler'
import { appInsightsClient } from './_common/services/appInsights'

export type Handlers = {
  [key in HTTP_METHOD]?: NextApiHandler
}

export const handler = (handlers: Handlers) => {
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

    const userId = req.headers['x-user-id'] as string
    if (!userId) {
      return res.status(401).json({
        error: {
          message: 'Unauthorized request',
          statusCode: 401,
        },
      })
    }

    try {
      await handler(req, res)
    } catch (error) {
      if (error instanceof Error) {
        const exception = new Error(error.message, { cause: error })
        appInsightsClient.trackException({
          exception,
        })
      } else {
        appInsightsClient.trackException({
          exception: new Error('Inetrnal server error', { cause: error }),
        })
      }
      errorHandler(error, res)
    }
  }
}

export const customFetch = async (method: HTTP_METHOD = 'POST', endpoint: string, req: NextApiRequest) => {
  const userId = req.headers['x-user-id'] as string
  const headers = new Headers()
  headers.append('x-user-id', userId)
  const options = {
    method,
    headers,
    body: req.body,
  }
  const response = await fetch(process.env.API_ENDPOINT + endpoint, options)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await response.json()
}
