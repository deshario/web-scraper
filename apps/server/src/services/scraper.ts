import { Job } from 'bull'
import { TKeywordProcessor } from '../interfaces'
import { saveResults } from './saveResult'

export const keywordProcess = async (job: Job<TKeywordProcessor>) => {
  try {
    const { ownerId, payload } = job.data
    console.log(`Scrapping Job: [${job.id}]`)

    // Scrap data from keyword

    const keywords = saveResults(
      payload.map((data) => {
        return {
          ...data,
          totalLinks: 0,
          adWordsCount: 5,
          resultsCount: 5,
          uploader: ownerId,
          executionTime: 0.5,
          isProcessed: true,
          htmlPreview: '<p>hello world</p>',
        }
      }),
    )
    return Promise.resolve(keywords)
  } catch (err) {
    return Promise.reject(err)
  }
}
