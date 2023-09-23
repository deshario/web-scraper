import Bull from 'bull'
import env from '../config/environment'
import { keywordProcess } from './scraper'

const scraperQueue = new Bull('scraper-queue', {
  redis: env.redis.connection,
})

scraperQueue.process(keywordProcess)

export const addKeywordsToQueue = async (ownerId: number, keywords: string[]) => {
  await scraperQueue.add({ data: { ownerId, keywords } }, { delay: 1000 })
}
