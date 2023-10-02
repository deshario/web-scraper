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
  } catch (error) {
    return res.json({ success: false, error: getErrorMsg(error) })
  }
}

const uploadKeywords = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('Please upload valid file')
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
