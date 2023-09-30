import { saveKeywordContent, saveResult } from '../scraper'

jest.mock('../../db/models', () => ({
  models: {
    Keyword: {
      update: jest.fn(),
    },
    KeywordContent: {
      create: jest.fn(),
    },
  },
}))

describe('Keyword result', () => {
  let keywordMock: jest.Mock

  beforeAll(() => {
    keywordMock = jest.requireMock('../../db/models').models.Keyword.update
  })

  test('Should save the keyword result successfully', async () => {
    const affectedRows = 1
    const keyword = { id: 1, isProcessed: true }

    keywordMock.mockResolvedValue([affectedRows])

    const updatedRows = await saveResult(keyword)
    expect(updatedRows).toEqual([affectedRows])
    expect(keywordMock).toHaveBeenCalledWith(keyword, { where: { id: keyword.id } })
  })

  test('should throw an error while saving the keyword result', async () => {
    keywordMock.mockRejectedValue(new Error('Process failed'))
    const keyword = { id: 1, isProcessed: true }
    await expect(saveResult(keyword)).rejects.toThrowError('Process failed')
  })
})

describe('Keyword content', () => {
  let keywordContentMock: jest.Mock
  const keywordContent = {
    keywordId: 1,
    htmlContent: '<p>hello world</p>',
  }

  beforeAll(() => {
    keywordContentMock = jest.requireMock('../../db/models').models.KeywordContent.create
  })

  test('Should create the keyword content successfully', async () => {
    keywordContentMock.mockResolvedValue({ id: 20 })
    const contentId = await saveKeywordContent(keywordContent)
    expect(contentId).toBe(20)
  })

  test('should throw an error while creating keyword content', async () => {
    keywordContentMock.mockRejectedValue(new Error('Process failed'))
    await expect(saveKeywordContent(keywordContent)).rejects.toThrowError('Process failed')
  })
})
