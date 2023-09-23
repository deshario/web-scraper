import { Job } from 'bull'

export const keywordProcess = async (job: Job) => {
  const { ownerId, keywords } = job.data.data
  console.log(`Processing job ${job.id} for user: ${ownerId}`)
  console.log('Payload', keywords)
  return Promise.resolve()
}
