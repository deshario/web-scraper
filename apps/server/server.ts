import express from 'express'
import helmet from 'helmet'
import routes from './src/routes'
import env from './src/config/environment'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(env.express.port, () => {
  console.log(`\n⚡️Server running at ${env.express.port}\n`)
})
