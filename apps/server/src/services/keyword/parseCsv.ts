export const parseCsv = (csvFile: Express.Multer.File) => {
  const contents = csvFile.buffer.toString('utf-8')
  const keywords = contents.split(/\r?\n/).filter(Boolean)
  if (keywords.length > 100) {
    throw new Error('The file should contain no more than 100 keyword')
  }
  return keywords
}
