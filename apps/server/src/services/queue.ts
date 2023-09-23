import Bull from 'bull'
import env from '../config/environment'
import { keywordProcess } from './scraper'
import { TKeywordProcessor } from '../interfaces'

const scraperQueue = new Bull('scraper-queue', {
  redis: env.redis.connection,
})

scraperQueue.process(keywordProcess)

export const addKeywordsToQueue = async (payload: TKeywordProcessor) => {
  await scraperQueue.add(payload, { delay: 1000 })
}
