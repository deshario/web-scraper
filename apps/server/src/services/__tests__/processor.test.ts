import { Job } from 'bull'
import { processKeyword } from '../scraper/processor'
import { TKeywordProcessor } from '../../interfaces'

jest.mock('../scraper/scraper', () => ({
  scrapeKeywordData: jest.fn(),
}))

jest.mock('../scraper/saveResult', () => ({
  saveResult: jest.fn(),
  saveKeywordContent: jest.fn(() => 12345),
}))

jest.mock('../socket', () => ({
  syncKeyword: jest.fn(),
}))

describe('scrapeKeywordData', () => {
  let scrapeKeywordDataMock: jest.Mock

  const jobToProcess = {
    id: 1,
    data: {
      ownerName: 'daryl',
      payload: { id: 10, keyword: 'Bangkok' },
    },
  } as Job<TKeywordProcessor>

  beforeAll(() => {
    scrapeKeywordDataMock = jest.requireMock('../scraper/scraper').scrapeKeywordData
  })

  test('should process a keyword successfully', async () => {
    scrapeKeywordDataMock.mockResolvedValue({
      totalLinks: 2,
      adWordsCount: 1,
      resultsCount: 1000,
      executionTime: 0.5,
    })

    const processed = await processKeyword(jobToProcess)

    expect(processed.id).toBe(10)
    expect(processed.isProcessed).toBe(true)
    expect(processed.contentId).toBe(12345)
    expect(processed.totalLinks).toBe(2)
    expect(processed.adWordsCount).toBe(1)
    expect(processed.resultsCount).toBe(1000)
    expect(processed.executionTime).toBe(0.5)
  })

  test('should throw an error if processing fails', async () => {
    scrapeKeywordDataMock.mockRejectedValue(new Error('Process failed'))
    await expect(processKeyword(jobToProcess)).rejects.toThrowError('Process failed')
  })
})
