import fs from 'fs'
import {
  getErrorMsg,
  extractNonce,
  getRandomAgent,
  getRandomDelay,
  getRandomString,
  splitArrToChunks,
  getExecutionResult,
} from '../index'

const html = `<!doctype html><head><script nonce="123456789"></script><script nonce="123456789"></script></head></html>`

describe('Utility Functions', () => {
  describe('splitArrToChunks', () => {
    test('should split an array into chunks', () => {
      const array = [1, 2, 3, 4, 5]
      const chunkSize = 2
      const result = splitArrToChunks(array, chunkSize)
      expect(result).toEqual([[1, 2], [3, 4], [5]])
    })
  })

  describe('getExecutionResult', () => {
    test('should parse and return valid execution results', () => {
      const resultsText = 'About 2,160,000,000 results (0.48 seconds)'
      const result = getExecutionResult(resultsText)
      expect(result).toEqual({ resultsCount: '2,160,000,000', executionTime: 0.48 })
    })

    test('should return null for invalid results', () => {
      const result = getExecutionResult('')
      expect(result).toEqual({ resultsCount: null, executionTime: null })
    })
  })

  describe('getErrorMsg', () => {
    test('should return error message for Error object', () => {
      const error = new Error('Test error')
      const result = getErrorMsg(error)
      expect(result).toBe('Test error')
    })

    test('should return a fallback error message', () => {
      const result = getErrorMsg('Some error')
      expect(result).toBe('Something went wrong')
    })
  })

  describe('extractNonce', () => {
    test('should return valid nonce from HTML content', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue(html)
      const result = extractNonce(html)
      expect(fs.readFileSync).toHaveBeenCalledWith(html, 'utf8')
      expect(result).toBe('123456789')
    })

    test('should extract empty nonce from HTML content', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('')
      const result = extractNonce(html)
      expect(fs.readFileSync).toHaveBeenCalledWith(html, 'utf8')
      expect(result).toBe('')
    })
  })

  describe('getRandomString', () => {
    test('should return a random string', () => {
      const result = getRandomString()
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })
  })

  describe('getRandomAgent', () => {
    test('should return a random user agent', () => {
      const userAgent = getRandomAgent()
      expect(typeof userAgent).toBe('string')
    })
  })

  describe('getRandomDelay', () => {
    test('should return a random delay within the specified range', () => {
      const minDelay = 1000
      const maxDelay = 5000

      const result = getRandomDelay(maxDelay)

      expect(result).toBeGreaterThanOrEqual(minDelay)
      expect(result).toBeLessThanOrEqual(maxDelay)
    })
  })
})
