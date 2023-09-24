export type TKeyword = {
  id: number
  keyword: string
  uploader: number
  totalLinks?: number
  adWordsCount?: number
  resultsCount?: string
  executionTime?: number
  htmlPreview?: string
  isProcessed: boolean
}

export type TKeywordResponse = {
  success: boolean
  error?: string
  keywords: TKeyword[]
}
