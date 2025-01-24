import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
    baseURL: env.DATABASE_URL,
})