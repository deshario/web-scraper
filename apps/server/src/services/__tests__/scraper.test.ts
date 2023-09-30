import { scrapeKeywordData } from '../'

jest.mock('../scraper/googleSearch')

jest.mock('../../utils', () => ({
  getExecutionResult: jest.fn(() => ({
    resultsCount: 500,
    executionTime: 0.5,
  })),
}))

describe('Scraper', () => {
  let scrapeGoogleSearchMock: jest.Mock

  beforeAll(() => {
    scrapeGoogleSearchMock = jest.requireMock('../scraper/googleSearch').getSearchResult
  })

  test('should scrape keyword data successfully', async () => {
    scrapeGoogleSearchMock.mockReturnValue(
      `<html>
      <body>
        <a href="https://www.google.com">Google</a>
        <a href="https://github.com">Github</a>
      </body>
      </html>`,
    )

    const scrapedData = await scrapeKeywordData('keyword')

    expect(scrapedData.totalLinks).toBe(2)
    expect(scrapedData.adWordsCount).toBe(0)
    expect(scrapedData.resultsCount).toBe(500)
    expect(scrapedData.executionTime).toBe(0.5)
    expect(scrapedData.htmlContent).toContain('<a href="https://www.google.com">Google</a>')
  })

  test('should throw and error if scraping fail', async () => {
    scrapeGoogleSearchMock.mockRejectedValue(new Error('Scraping not allowed'))
    await expect(scrapeKeywordData('')).rejects.toThrowError('Scraping not allowed')
  })
})
