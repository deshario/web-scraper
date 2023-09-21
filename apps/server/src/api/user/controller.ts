import { Request, Response } from 'express'
import { models } from '../../db/models'

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await models.User.findAll({
      raw: true,
      attributes: {
        exclude: ['passwordHash'],
      },
    })
    return res.json({ success: true, data: users })
  } catch (err) {
    return res.json({ success: false, error: 'Something went wrong' })
  }
}

export default {
  getUsers,
}
