import axios from 'axios'
import { getSearchResult } from '../scraper/googleSearch'

describe('Google Search', () => {
  test('should return empty string for invalid keyword', async () => {
    axios.get = jest.fn().mockResolvedValue('')
    const actualValue = await getSearchResult('iPhone')
    expect(actualValue).toEqual('')
  })

  test('should return an empty string for invalid request', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error('Request failed'))
    await expect(getSearchResult('')).rejects.toThrow('Request failed')
  })
})
