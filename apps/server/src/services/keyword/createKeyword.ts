import { models } from '../../db/models'

export const createKeywordPayload = (userId: number, keywords: string[]) => {
  return keywords.map((keyword) => ({
    keyword,
    uploader: userId,
  }))
}

export const createKeyword = async (
  payload: {
    keyword: string
    uploader: number
  }[],
) => {
  try {
    const savedKeywords = await models.Keyword.bulkCreate(payload)
    return savedKeywords.map(({ id, keyword }) => ({ id, keyword }))
  } catch (err) {
    throw new Error('Keyword creation failed')
  }
}
