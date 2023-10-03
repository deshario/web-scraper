import axios from 'axios'
import { getSearchResult } from '../scraper/googleSearch'

describe('Google Search', () => {
  test('should return empty string for invalid keyword', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: '' })
    const searchResult = await getSearchResult('')
    expect(searchResult).toEqual('')
  })

  test('should throw an error for invalid search', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error('Request failed'))
    await expect(getSearchResult('')).rejects.toThrow('Request failed')
  })
})
