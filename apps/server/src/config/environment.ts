import 'dotenv/config'

const environment = {
  express: {
    port: process.env.EXPRESS_PORT || 8080,
  },
  secret: {
    accessToken: process.env.ACCESS_TOKEN_SECRET || '1A1zP1eP5QGefi2DM',
    refreshToken: process.env.REFRESH_TOKEN_SECRET || 'PTfTL5SLmv7DivfNa',
  },
  redis: {
    connection: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
  },
}

export default environment
