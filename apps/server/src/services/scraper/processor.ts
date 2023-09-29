import * as cheerio from 'cheerio'
import { Job } from 'bull'
import { TKeywordProcessor, TKeywordResult, TScrapedResult } from '../../interfaces'
import { saveKeywordContent, saveResult } from './saveResult'
import { scrapeGoogleSearch } from './scraper'
import { getErrorMsg, getExecutionResult } from '../../utils'
import { syncKeyword } from '../socket'

const scrapeKeywordData = async (keyword: string): Promise<TScrapedResult> => {
  try {
    const html = await scrapeGoogleSearch(keyword)
    const $ = cheerio.load(html)
    const totalLinks = $('body a').length
    const adWordsCount = $('.uEierd').length // #tads | #uEierd
    const stats = $('#result-stats').text()
    const { resultsCount, executionTime } = getExecutionResult(stats)

    return {
      totalLinks,
      adWordsCount,
      ...(resultsCount && { resultsCount }),
      ...(executionTime && { executionTime }),
      htmlContent: html,
    }
  } catch (err) {
    throw new Error(getErrorMsg(err))
  }
}

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
    throw new Error(getErrorMsg(err))
  }
}
