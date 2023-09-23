import fs from 'fs'

export const splitArrToChunks = <T>(array: T[], chunkSize: number) => {
  const numChunks = Math.ceil(array.length / chunkSize)
  return Array.from({ length: numChunks }, (_, index) => {
    const start = index * chunkSize
    const end = start + chunkSize
    return array.slice(start, end)
  })
}

export const getExecutionResult = (resultsText = '') => {
  const regexPattern = /([\d,]+)\sresults\s\(([\d.]+)\sseconds\)/
  const match = regexPattern.exec(resultsText.trim())

  return {
    resultsCount: match?.[1] || null,
    executionTime: Number(match?.[2]) || null,
  }
}

export const getErrorMsg = (error: unknown) => {
  return error instanceof Error ? error.message : 'Something went wrong'
}

export const extractNonce = (html: string) => {
  const content = fs.readFileSync(html, 'utf8')
  const scriptTag = content.match(/<script[^>]*?nonce="([^"]*)"[^>]*>/g)
  const nonce = scriptTag ? scriptTag[1].match(/nonce="([^"]*)"/)?.[1] : ''
  return nonce
}

export const getRandomString = () => {
  return (Math.random() + 1).toString(36).substring(3)
}

export const getRandomAgent = () => {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
  ]
  const random = Math.floor(Math.random() * userAgents.length)
  return userAgents[random]
}

export const getRandomDelay = (maxDelay = 5000) => {
  const minDelay = 1000
  const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay
  return Math.floor(randomDelay)
}
