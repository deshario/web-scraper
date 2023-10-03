import { MAX_KEYWORDS } from '../../constants'

export const parseCsv = (csvFile: Express.Multer.File) => {
  const contents = csvFile.buffer.toString('utf-8')
  const keywords = contents.split(/\r?\n/).filter(Boolean)
  if (keywords.length > MAX_KEYWORDS) {
    throw new Error('The file should contain no more than 100 keyword')
  }
  return keywords
}
