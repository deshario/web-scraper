import { TKeywordResult } from '../../interfaces'
import { models } from '../../db/models'

export const saveResult = async (result: TKeywordResult | null) => {
  try {
    const keyword = await models.Keyword.update({ ...result }, { where: { id: result?.id } })
    return keyword
  } catch (err) {
    console.log(err)
  }
}
