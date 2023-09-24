import express from 'express'
import helmet from 'helmet'
import passport from 'passport'
import cors from 'cors'
import routes from './src/routes'
import Connection from './src/db/connection'
import env from './src/config/environment'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(routes)

Connection.connect()

app.listen(env.express.port, () => {
  console.log(`\n⚡️Server running at ${env.express.port}\n`)
})
