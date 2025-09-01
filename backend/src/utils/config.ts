import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 3002

const FRONTEND_URL = process.env.FRONTEND_URL

export default {
  PORT,
  FRONTEND_URL
}
