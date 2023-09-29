import { Request, Response } from 'express'
import { models } from '../../db/models'
import { getErrorMsg } from '../../utils'
import { parseCsv, addToQueue, createKeyword, createKeywordPayload } from '../../services/keyword'

const getKeywords = async (req: Request, res: Response) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.user?.id },
    })
    const keywords = user ? await user.getKeywords({ order: [['id', 'DESC']] }) : []
    return res.json({ success: true, keywords })
  } catch (err) {
    return res.json({ success: false, error: getErrorMsg(err) })
  }
}

const uploadKeywords = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.json({ success: false, error: 'Please upload valid file' })
    }
    const { id: userId, username } = req.user!
    const keywords = await parseCsv(req.file)
    const payload = createKeywordPayload(userId, keywords)
    const savedKeywords = await createKeyword(payload)
    const keywordsQueue = addToQueue(username, savedKeywords)
    await Promise.all(keywordsQueue)
    return res.json({ success: true })
  } catch (err) {
    return res.json({ success: false, error: getErrorMsg(err) })
  }
}

const getPreview = async (req: Request, res: Response) => {
  try {
    const keywordContent = await models.KeywordContent.findOne({ where: { id: req.params.id } })
    if (!keywordContent) {
      return res.json({ success: false })
    }
    const { htmlContent } = keywordContent
    return res.json({ success: true, htmlContent })
  } catch (err) {
    return res.json({ success: false, error: getErrorMsg(err) })
  }
}

export default {
  getKeywords,
  getPreview,
  uploadKeywords,
}
