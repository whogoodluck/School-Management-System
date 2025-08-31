import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 3001
const BASE_URL = process.env.BASE_URL || 'http://localhost:3002'

export default {
  PORT,
  BASE_URL
}
