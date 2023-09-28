import fs from 'fs'
import path from 'path'
import * as cheerio from 'cheerio'
import { Job } from 'bull'
import { TKeywordProcessor, TKeywordResult } from '../../interfaces'
import { saveResult } from './saveResult'
import { scrapeGoogleSearch } from './scraper'
import { getExecutionResult, getRandomString } from '../../utils'
import { syncKeyword } from '../socket'

const scrapeKeywordData = async (keyword: string): Promise<TKeywordResult | null> => {
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
      htmlPreview: html,
      isProcessed: true,
    }
  } catch (err) {
    return null
  }
}

export const processKeyword = async (job: Job<TKeywordProcessor>) => {
  try {
    const { ownerName, payload } = job.data
    console.log(`Processing: [${job.id}] ${payload.keyword}`)
    const result = await scrapeKeywordData(payload.keyword)
    if (result) {
      const fileName = `${getRandomString()}.html`
      const pagesDir = path.join(__dirname, '../../pages', fileName)
      await fs.writeFileSync(pagesDir, result.htmlPreview!)
      result.id = payload.id
      result.htmlPreview = fileName
    }

    await saveResult(result)

    syncKeyword(ownerName, result)

    return Promise.resolve(result)
  } catch (err) {
    return Promise.reject(err)
  }
}
