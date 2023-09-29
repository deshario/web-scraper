import { addKeywordToQueue } from '../scraper'

export const addToQueue = (username: string, keywords: { id: number; keyword: string }[]) => {
  return keywords.map((keywordWithId) =>
    addKeywordToQueue({
      ownerName: username,
      payload: keywordWithId,
    }),
  )
}
