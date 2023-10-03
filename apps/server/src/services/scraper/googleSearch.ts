import axios from 'axios'
import { getRandomAgent } from '../../utils'

export const getSearchResult = async (keyword: string): Promise<string> => {
  try {
    const endpoint = `https://www.google.com/search?q=${keyword}&hl=en`
    const response = await axios.get(endpoint, {
      headers: {
        'User-Agent': getRandomAgent(),
      },
    })
    return response.data || ''
  } catch (error) {
    throw error
  }
}
