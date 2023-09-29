import axios from 'axios'
import { scrapeGoogleSearch } from '../scraper'

describe('scrapeGoogleSearch', () => {
  test('should return empty string for invalid keyword', async () => {
    axios.get = jest.fn().mockResolvedValue('')
    const actualValue = await scrapeGoogleSearch('iPhone')
    expect(actualValue).toEqual('')
  })

  test('should return an empty string for invalid request', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error('Request failed'))
    await expect(scrapeGoogleSearch('')).rejects.toThrow('Request failed')
  })
})
