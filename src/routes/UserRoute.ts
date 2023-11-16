import express from 'express'
import "dotenv/config"
import { createUser, loginUser } from '../controllers/user'

const router = express.Router()

router.post('/signup', createUser) // signup
router.post('/login', loginUser) // login 

export default router