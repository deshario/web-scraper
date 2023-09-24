import express, { Request, Response } from 'express'
import { models } from '../../db/models'
import { signAccessToken, signRefreshToken } from '../../services'
import { loginSchema, registerSchema } from '../../api/user/schema'
import { authenticate, validateSchema } from '../../middlewares'

const router = express.Router()

router.post('/', [validateSchema(loginSchema), authenticate], (req: Request, res: Response) => {
  const accessToken = signAccessToken(req.user!)
  const refreshToken = signRefreshToken(req.user!)
  return res.json({ success: true, accessToken, refreshToken, user: req.user })
})

router.post('/register', validateSchema(registerSchema), async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  const existingUser = await models.User.getUser({ username, email })
  if (existingUser) {
    return res.json({ success: false, error: 'Please choose unique username and email' })
  }
  await models.User.signUp(username, email, password)
  res.json({ success: true })
})

export default router
