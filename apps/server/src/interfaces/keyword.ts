export type TKeyword = {
  keyword: string
  uploader: number
  totalLinks?: number
  adWordsCount?: number
  resultsCount?: number
  executionTime?: number
  htmlPreview?: string
  isProcessed: boolean
}

export type TKeywordProcessor = {
  ownerId: number
  payload: {
    id: number
    keyword: string
  }[]
}
