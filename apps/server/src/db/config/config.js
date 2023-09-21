// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  development: {
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      charset: 'utf8',
    },
    logging: false,
  },
}
