import { TKeyword } from '../interfaces'
import { models } from '../db/models'

export const saveResults = async (payload: TKeyword[]) => {
  try {
    const keywords = await models.Keyword.bulkCreate(payload, {
      updateOnDuplicate: [
        'totalLinks',
        'adWordsCount',
        'resultsCount',
        'executionTime',
        'htmlPreview',
        'isProcessed',
      ],
    })
    return keywords
  } catch (err) {
    console.log(err)
  }
}
