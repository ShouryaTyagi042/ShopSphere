import express from 'express'
import "dotenv/config"
import { createUser } from '../controllers/user'

const router = express.Router()

router.post('/signup', createUser) // signup

export default router