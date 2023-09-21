import express from 'express'
import userController from './controller'

const router = express.Router()

router.get('/', userController.getUsers)

export default router
