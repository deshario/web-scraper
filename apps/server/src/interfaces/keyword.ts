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

type TKeywordPayload = {
  id: number
  keyword: string
}

export type TKeywordResult = Omit<TKeyword, 'keyword' | 'uploader'> & {
  id?: number
}

export type TKeywordProcessor = {
  ownerName: string
  payload: TKeywordPayload
}
