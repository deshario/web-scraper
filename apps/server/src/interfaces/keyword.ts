export type TKeyword = {
  keyword: string
  uploader: number
  totalLinks?: number
  adWordsCount?: number
  resultsCount?: string
  executionTime?: number
  htmlPreview?: string
  isProcessed: boolean
}

export type TKeywordPayload = {
  id: number
  keyword: string
}

export type TKeywordResult = TKeyword & { id: number }

export type TKeywordProcessor = {
  ownerId: number
  payload: TKeywordPayload[]
}
