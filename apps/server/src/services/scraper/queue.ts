import Bull from 'bull'
import env from '../../config/environment'
import { processKeyword } from './processor'
import { TKeywordProcessor } from '../../interfaces'

const scraperQueue = new Bull('scraper-queue', {
  redis: env.redis.connection,
})

scraperQueue.process(processKeyword)

export const addKeywordsToQueue = async (payload: TKeywordProcessor) => {
  await scraperQueue.add(payload, { delay: 1000 })
}
