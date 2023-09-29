export const parseCsv = (csvFile: Express.Multer.File) => {
  const contents = csvFile.buffer.toString('utf-8')
  const keywords = contents.split(/\r?\n/).filter(Boolean)
  return keywords
}
