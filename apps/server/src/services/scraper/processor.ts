import { Job } from 'bull'
import { TKeywordProcessor, TKeywordResult } from '../../interfaces'
import { saveKeywordContent, saveResult } from './saveResult'
import { syncKeyword } from '../socket'
import { scrapeKeywordData } from './scraper'

export const processKeyword = async (job: Job<TKeywordProcessor>) => {
  try {
    const { ownerName, payload } = job.data
    console.log(`Processing: [${job.id}] ${payload.keyword}`)
    const scrapedData = await scrapeKeywordData(payload.keyword)

    let keywordResult: TKeywordResult = { id: payload.id, isProcessed: true }

    if (scrapedData) {
      const { htmlContent, ...result } = scrapedData
      const contentId = await saveKeywordContent({
        keywordId: payload.id,
        htmlContent: htmlContent,
      })

      keywordResult = {
        contentId,
        ...result,
        ...keywordResult,
      }

      await saveResult(keywordResult)
    }

    syncKeyword(ownerName, keywordResult)

    return Promise.resolve(keywordResult)
  } catch (err) {
    throw err
  }
}
