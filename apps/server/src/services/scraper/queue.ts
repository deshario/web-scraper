import Bull from 'bull'
import env from '../../config/environment'
import { processKeyword } from './processor'
import { TKeywordProcessor } from '../../interfaces'
import { getRandomDelay } from '../../utils'

const scraperQueue = new Bull('scraper-queue', {
  redis: env.redis.connection,
})

scraperQueue.process(processKeyword)

export const addKeywordToQueue = async (payload: TKeywordProcessor) => {
  await scraperQueue.add(payload, { delay: getRandomDelay() })
}
