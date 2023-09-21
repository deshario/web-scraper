import express from 'express'
import users from './api/user'

const router = express.Router()

router.use('/api/users', users)

router.get('/', (req, res) => {
  res.json({ timestamp: new Date().getTime() })
})

export default router
