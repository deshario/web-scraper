import { Request, Response } from 'express'
import { models } from '../../db/models'
import { getErrorMsg } from '../../utils'
import { addKeywordToQueue } from '../../services'

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
    const userId = req.user!.id
    const username = req.user!.username
    const fileContents = req.file.buffer.toString('utf-8')
    const keywords = fileContents.split(/\r?\n/).filter(Boolean)
    const payload = keywords.map((keyword) => {
      return {
        keyword,
        uploader: userId,
      }
    })

    const savedKeywords = await models.Keyword.bulkCreate(payload)
    const keywordsWithId = savedKeywords.map(({ id, keyword }) => ({ id, keyword }))
    const addToQueue = keywordsWithId.map((keywordWithId) =>
      addKeywordToQueue({
        ownerName: username,
        payload: keywordWithId,
      }),
    )

    await Promise.all(addToQueue)

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
