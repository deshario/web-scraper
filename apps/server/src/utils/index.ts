import fs from 'fs'

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

export const getRandomDelay = () => {
  const minDelayMS = 500 // 0.5 second
  const maxDelayMS = 2000 // 2 second
  const randomDelay = Math.random() * (maxDelayMS - minDelayMS) + minDelayMS
  return Math.floor(randomDelay)
}
