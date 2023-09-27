import express from 'express'
import auth from './auth'
import users from './api/user'
import keywords from './api/keywords'

const router = express.Router()

router.use('/auth', auth)
router.use('/api/users', users)
router.use('/api/keywords', keywords)

router.get('/', (req, res) => {
  res.json({ timestamp: new Date().getTime() })
})

export default router
