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
  } catch (error) {
    return res.json({ success: false, error: getErrorMsg(error) })
  }
}

const uploadKeywords = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('Please upload valid file')
    }
    const { id: userId, username } = req.user!
    const keywords = parseCsv(req.file)
    const payload = createKeywordPayload(userId, keywords)
    const savedKeywords = await createKeyword(payload)
    const keywordsQueue = addToQueue(username, savedKeywords)
    await Promise.all(keywordsQueue)
    return res.json({ success: true })
  } catch (error) {
    return res.json({ success: false, error: getErrorMsg(error) })
  }
}

const getPreview = async (req: Request, res: Response) => {
  try {
    const keywordContent = await models.KeywordContent.findOne({ where: { id: req.params.id } })
    if (!keywordContent) {
      throw new Error('Keyword content not found!')
    }
    const { htmlContent } = keywordContent
    return res.json({ success: true, htmlContent })
  } catch (error) {
    return res.json({ success: false, error: getErrorMsg(error) })
  }
}

export default {
  getKeywords,
  getPreview,
  uploadKeywords,
}
