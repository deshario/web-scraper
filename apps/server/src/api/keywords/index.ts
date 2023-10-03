import express from 'express'
import multer from 'multer'
import keywordsController from './controller'
import { previewSchema } from './schema'
import { checkAuthentication, validateSchema } from '../../middlewares'

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024, // 1MB
  },
  fileFilter: function (req, file, cb) {
    return cb(null, file.mimetype === 'text/csv')
  },
})

router.get('/', checkAuthentication, keywordsController.getKeywords)
router.get('/:id', validateSchema(previewSchema, 'params'), keywordsController.getPreview)
router.post('/', [checkAuthentication, upload.single('csv')], keywordsController.uploadKeywords)

export default router
