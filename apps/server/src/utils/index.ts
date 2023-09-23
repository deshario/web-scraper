export const splitArrToChunks = (array: string[], chunkSize: number) => {
  const numChunks = Math.ceil(array.length / chunkSize)
  return Array.from({ length: numChunks }, (_, index) => {
    const start = index * chunkSize
    const end = start + chunkSize
    return array.slice(start, end)
  })
}
