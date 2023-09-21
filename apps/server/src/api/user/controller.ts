import { Request, Response } from 'express'

const getUsers = async (req: Request, res: Response) => {
  try {
    return res.json({ success: true, data: [] })
  } catch (err) {
    return res.json({ success: false, error: 'Something went wrong' })
  }
}

export default {
  getUsers,
}
