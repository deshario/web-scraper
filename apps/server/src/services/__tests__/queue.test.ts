import Bull from 'bull'
import { addKeywordToQueue } from '../'
import env from '../../config/environment'

jest.mock('bull', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    add: jest.fn(),
    process: jest.fn(),
  }),
}))

describe('Bull Queue', () => {
  test('Should add keywords to the queue', async () => {
    const scraperQueue = new Bull('scraper-queue', {
      redis: env.redis.connection,
    })
    const payload = {
      ownerName: 'string',
      payload: { id: 1, keyword: 'iPhone' },
    }
    await addKeywordToQueue(payload)
    expect(scraperQueue.add).toHaveBeenCalledTimes(1)
    expect(scraperQueue.process).toHaveBeenCalledTimes(1)
  })
})
