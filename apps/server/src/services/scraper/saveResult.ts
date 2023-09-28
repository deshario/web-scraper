import { TKeywordContent, TKeywordResult } from '../../interfaces'
import { models } from '../../db/models'

export const saveResult = async (result: TKeywordResult) => {
  try {
    return await models.Keyword.update(result, { where: { id: result?.id } })
  } catch (err) {
    console.log(err)
  }
}

export const saveKeywordContent = async (content: TKeywordContent) => {
  try {
    const keywordContent = await models.KeywordContent.create(content)
    return keywordContent.id
  } catch (err) {
    console.log(err)
  }
}
