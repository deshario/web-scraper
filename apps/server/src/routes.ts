import express from 'express'
import users from './api/user'
import auth from './auth'

const router = express.Router()

router.use('/auth', auth)
router.use('/api/users', users)

router.get('/', (req, res) => {
  res.json({ timestamp: new Date().getTime() })
})

export default router
