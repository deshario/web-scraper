import * as cheerio from 'cheerio'
import { TScrapedResult } from '../../interfaces'
import { getExecutionResult } from '../../utils'
import { getSearchResult } from './googleSearch'

export const scrapeKeywordData = async (keyword: string): Promise<TScrapedResult> => {
  try {
    const html = await getSearchResult(keyword)
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
  } catch (error) {
    throw error
  }
}
