import { Request, Response } from 'express'
import { models } from '../../db/models'
import { getErrorMsg } from '../../utils'

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await models.User.findAll({
      raw: true,
      attributes: {
        exclude: ['passwordHash'],
      },
    })
    return res.json({ success: true, data: users })
  } catch (error) {
    return res.json({ success: false, error: getErrorMsg(error) })
  }
}

export default {
  getUsers,
}
