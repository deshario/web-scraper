import 'dotenv/config'

const environment = {
  express: {
    port: process.env.EXPRESS_PORT || 8080,
  },
}

export default environment
