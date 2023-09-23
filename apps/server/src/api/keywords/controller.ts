import { Request, Response } from 'express'
import { models } from '../../db/models'

const getKeywords = async (req: Request, res: Response) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.user?.id },
    })
    const keywords = user ? await user.getKeywords() : []
    return res.json({ success: true, keywords })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Something went wrong'
    return res.json({ success: false, error: message })
  }
}

const uploadKeywords = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.json({ success: false, error: 'Please upload valid file' })
    }
    const fileContents = req.file.buffer.toString('utf-8')
    const keywords = fileContents.split(/\r?\n/).filter(Boolean)
    const payload = keywords.map((keyword) => {
      return {
        keyword,
        uploader: req.user?.id,
      }
    })
    await models.Keyword.bulkCreate(payload)
    return res.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Something went wrong'
    return res.json({ success: false, error: message })
  }
}

export default {
  getKeywords,
  uploadKeywords,
}
