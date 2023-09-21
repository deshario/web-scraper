import express from 'express'
import passport from 'passport'
import { models } from '../db/models'
import token from './jwt'
import local from './local'
import { setupJWTStrategy } from './jwt/passport'
import { setupLocalStrategy } from './local/passport'

setupJWTStrategy()
setupLocalStrategy()

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((userId, done) => {
  models.User.getUser({ id: Number(userId) }).then((user) => done(null, user))
})

const router = express.Router()

router.use('/local', local)
router.use('/token', token)

export default router
