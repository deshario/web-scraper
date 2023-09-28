export type TKeyword = {
  keyword: string
  uploader: number
  totalLinks: number
  adWordsCount: number
  resultsCount?: string
  executionTime?: number
  contentId?: number
  isProcessed: boolean
}

type TKeywordPayload = {
  id: number
  keyword: string
}

export type TKeywordResult = Partial<TKeyword> & {
  id: number
  isProcessed: boolean
}

export type TScrapedResult = Pick<
  TKeyword,
  'totalLinks' | 'adWordsCount' | 'resultsCount' | 'executionTime'
> & {
  htmlContent: string
}

export type TKeywordProcessor = {
  ownerName: string
  payload: TKeywordPayload
}

export type TKeywordContent = {
  keywordId: number
  htmlContent: string
}
