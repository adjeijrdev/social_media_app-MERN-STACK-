import express from 'express'
import { login} from '../contollers/auth.js'

const authRoutes = express.Router()

authRoutes.post('/login', login)

export default authRoutes
