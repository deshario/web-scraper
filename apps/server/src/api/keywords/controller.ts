import { Request, Response } from 'express'
import { models } from '../../db/models'
import { splitArrToChunks } from '../../utils'
import { addKeywordsToQueue } from '../../services'
import Keyword from '../../db/models/keyword'

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
    const userId = req.user?.id
    const fileContents = req.file.buffer.toString('utf-8')
    const keywords = fileContents.split(/\r?\n/).filter(Boolean)
    const payload = keywords.map((keyword) => {
      return {
        keyword,
        uploader: userId,
      }
    })

    const savedKeywords = await models.Keyword.bulkCreate(payload)
    const plainKeywords = savedKeywords.map((keyword) => keyword.get({ plain: true }) as Keyword)
    const keywordsWithId = plainKeywords.map(({ id, keyword }) => ({ id, keyword }))
    const chunks = splitArrToChunks(keywordsWithId, 10)
    const addToQueue = chunks.map((chunk) =>
      addKeywordsToQueue({
        ownerId: userId!,
        payload: chunk,
      }),
    )

    await Promise.all(addToQueue)

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
