import { NextApiResponse } from 'next'

export const errorHandler = (error: any, res: NextApiResponse) => {
  return res.status(500).json({ error })
}
