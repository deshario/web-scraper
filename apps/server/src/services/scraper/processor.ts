import { Job } from 'bull'
import { TKeywordPayload, TKeywordProcessor, TKeywordResult } from '../../interfaces'
import { saveResults } from './saveResults'
import { scrapeGoogleSearch } from './scraper'
import { getExecutionResult, getRandomDelay, getRandomString } from '../../utils'
import * as cheerio from 'cheerio'
import path from 'path'
import fs from 'fs'

const scrapeKeywordData = async (
  uploader: number,
  payload: TKeywordPayload,
): Promise<TKeywordResult | null> => {
  try {
    const { id, keyword } = payload
    const html = await scrapeGoogleSearch(payload.keyword)
    const $ = cheerio.load(html)
    const totalLinks = $('body a').length
    const adWordsCount = $('#tads').length
    const stats = $('#result-stats').text()
    const { resultsCount, executionTime } = getExecutionResult(stats)

    return {
      id,
      keyword,
      uploader,
      totalLinks,
      adWordsCount,
      ...(resultsCount && { resultsCount }),
      ...(executionTime && { executionTime }),
      isProcessed: true,
      htmlPreview: html,
    }
  } catch (err) {
    return null
  }
}

export const processKeyword = async (job: Job<TKeywordProcessor>) => {
  try {
    const { ownerId, payload } = job.data
    console.log(`Scrapping Job: [${job.id}]`)

    const scrapedResults: TKeywordResult[] = []
    for (const keyword of payload) {
      const result = await scrapeKeywordData(ownerId, keyword)
      if (result) {
        scrapedResults.push(result)
        const fileName = `${getRandomString()}.html`
        const pagesDir = path.join(__dirname, '../../pages', fileName)
        await fs.writeFileSync(pagesDir, result.htmlPreview!)
        result.htmlPreview = fileName
      }
      await new Promise((resolve) => setTimeout(resolve, getRandomDelay()))
    }

    await saveResults(scrapedResults)

    return Promise.resolve(scrapedResults)
  } catch (err) {
    return Promise.reject(err)
  }
}
